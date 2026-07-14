/**
 * Fetches the Hingashi Chronicles Substack RSS feed and writes build-time cache.
 * Runs automatically before `npm run build` via the prebuild script.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, 'src/data/talesFromTheSource.config.json');
const OUTPUT_PATH = path.join(ROOT, 'src/data/talesFromTheSource.json');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          fetchUrl(response.headers.location).then(resolve).catch(reject);
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode} for ${url}`));
          return;
        }

        const chunks = [];
        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      })
      .on('error', reject);
  });
}

function decodeXmlEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

function extractTag(block, tag) {
  const cdataMatch = block.match(
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, 'i'),
  );
  if (cdataMatch) {
    return decodeXmlEntities(cdataMatch[1].trim());
  }

  const plainMatch = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return plainMatch ? decodeXmlEntities(plainMatch[1].trim()) : '';
}

function stripHtml(value) {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractImageUrl(block) {
  const enclosureMatch = block.match(/<enclosure[^>]+url="([^"]+)"/i);
  if (enclosureMatch) {
    return decodeXmlEntities(enclosureMatch[1]);
  }

  const content = extractTag(block, 'content:encoded');
  const imageMatch = content.match(/<img[^>]+src="([^"]+)"/i);
  return imageMatch ? decodeXmlEntities(imageMatch[1]) : '';
}

function parseRssItems(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((match) => {
    const block = match[1];
    const title = extractTag(block, 'title');
    const description = stripHtml(extractTag(block, 'description'));
    const link = extractTag(block, 'link');
    const pubDate = extractTag(block, 'pubDate');
    const imageUrl = extractImageUrl(block);

    return {
      title,
      description,
      link,
      publishedAt: pubDate ? new Date(pubDate).toISOString() : null,
      imageUrl: imageUrl || null,
    };
  });
}

function parseChannel(xml) {
  const channelMatch = xml.match(/<channel>([\s\S]*?)<\/channel>/i);
  if (!channelMatch) {
    return {title: '', description: ''};
  }

  const channel = channelMatch[1];
  return {
    title: extractTag(channel, 'title'),
    description: stripHtml(extractTag(channel, 'description')),
  };
}

async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const existing = fs.existsSync(OUTPUT_PATH)
    ? JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8'))
    : null;

  let xml;
  try {
    xml = await fetchUrl(config.feedUrl);
  } catch (error) {
    if (existing) {
      console.warn(
        `Warning: could not refresh Tales feed (${error.message}). Using existing cache.`,
      );
      return;
    }

    throw new Error(`Could not fetch Tales feed and no cache exists: ${error.message}`);
  }

  const channel = parseChannel(xml);
  const posts = parseRssItems(xml)
    .filter((post) => post.title && post.link)
    .slice(0, config.maxPosts);

  const payload = {
    fetchedAt: new Date().toISOString(),
    publicationUrl: config.publicationUrl,
    publicationTitle: channel.title || config.publicationTitle,
    publicationDescription: channel.description || '',
    posts,
  };

  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`Wrote ${posts.length} Tales from the Source posts to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

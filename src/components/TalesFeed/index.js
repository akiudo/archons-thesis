import {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import talesConfig from '@site/src/data/talesFromTheSource.config.json';
import buildTimeFeed from '@site/src/data/talesFromTheSource.json';
import styles from './styles.module.css';

const RSS2JSON_ENDPOINT = 'https://api.rss2json.com/v1/api.json';

function decodeHtmlEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

function stripHtml(value) {
  if (!value) {
    return '';
  }

  return decodeHtmlEntities(value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function extractImageFromContent(content) {
  if (!content) {
    return null;
  }

  const match = content.match(/<img[^>]+src="([^"]+)"/i);
  return match ? match[1] : null;
}

function normalizeRss2JsonItem(item) {
  return {
    title: item.title,
    description: stripHtml(item.description),
    link: item.link,
    publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : null,
    imageUrl: item.thumbnail || extractImageFromContent(item.content) || null,
  };
}

function formatPublishedDate(isoDate) {
  if (!isoDate) {
    return null;
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(isoDate));
}

async function fetchLiveFeed() {
  const params = new URLSearchParams({
    rss_url: talesConfig.feedUrl,
  });
  const response = await fetch(`${RSS2JSON_ENDPOINT}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`RSS2JSON request failed with HTTP ${response.status}`);
  }

  const data = await response.json();
  if (data.status !== 'ok' || !Array.isArray(data.items)) {
    throw new Error(data.message || 'RSS2JSON returned an unexpected response');
  }

  return {
    fetchedAt: new Date().toISOString(),
    publicationUrl: data.feed?.link || talesConfig.publicationUrl,
    publicationTitle: data.feed?.title || talesConfig.publicationTitle,
    publicationDescription: stripHtml(data.feed?.description || buildTimeFeed.publicationDescription),
    posts: data.items
      .map(normalizeRss2JsonItem)
      .filter((post) => post.title && post.link)
      .slice(0, talesConfig.maxPosts),
  };
}

function PostCard({post}) {
  const publishedLabel = formatPublishedDate(post.publishedAt);

  return (
    <article className={styles.postCard}>
      {post.imageUrl ? (
        <a
          href={post.link}
          className={styles.imageLink}
          target="_blank"
          rel="noopener noreferrer">
          <img
            src={post.imageUrl}
            alt=""
            className={styles.postImage}
            loading="lazy"
            decoding="async"
          />
        </a>
      ) : null}

      <div className={styles.postBody}>
        <h3 className={styles.postTitle}>
          <a href={post.link} target="_blank" rel="noopener noreferrer">
            {post.title}
          </a>
        </h3>
        {post.description ? (
          <p className={styles.postDescription}>{post.description}</p>
        ) : null}
        {publishedLabel ? (
          <time className={styles.postDate} dateTime={post.publishedAt}>
            {publishedLabel}
          </time>
        ) : null}
      </div>
    </article>
  );
}

export default function TalesFeed() {
  const [feed, setFeed] = useState(buildTimeFeed);

  useEffect(() => {
    let cancelled = false;

    fetchLiveFeed()
      .then((liveFeed) => {
        if (!cancelled && liveFeed.posts.length > 0) {
          setFeed(liveFeed);
        }
      })
      .catch(() => {
        // Keep the build-time cache when live refresh is unavailable.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={styles.feed}>
      <div className={styles.postList}>
        {feed.posts.map((post) => (
          <PostCard key={post.link} post={post} />
        ))}
      </div>

      <div className={styles.readMore}>
        <Link
          href={feed.publicationUrl || talesConfig.publicationUrl}
          className={clsx('button button--primary button--lg', styles.readMoreButton)}
          target="_blank"
          rel="noopener noreferrer">
          Read more on Substack
        </Link>
      </div>
    </div>
  );
}

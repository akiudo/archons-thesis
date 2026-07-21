// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "The Archon's Thesis",
  tagline: 'A narrative companion to the FFXIV Main Scenario Quest',
  favicon: 'img/archons-logo.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://archons-thesis.com',
  // Custom domain — site is served from the domain root
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'controvi', // Usually your GitHub org/user name.
  projectName: 'archons-thesis', // Usually your repo name.

  trailingSlash: false,

  onBrokenLinks: 'throw',

  headTags: [
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: "The Archon's Thesis",
        url: 'https://archons-thesis.com/',
        description:
          'An interconnected multimedia lore encyclopedia and companion video essay project dedicated to Final Fantasy XIV.',
      }),
    },
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: "The Archon's Thesis",
        url: 'https://archons-thesis.com/',
        logo: 'https://archons-thesis.com/img/archons-logo.svg',
      }),
    },
  ],

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600&display=swap',
      type: 'text/css',
      rel: 'stylesheet',
    },
  ],

  scripts: [
    {
      src: 'https://lds-img.finalfantasyxiv.com/pc/global/js/eorzeadb/loader.js?v3',
      async: true,
    },
  ],

  clientModules: [require.resolve('./src/clientModules/eorzeaTooltips.js')],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        ...(isProd
          ? {
              gtag: {
                trackingID: 'G-56JC3LF4X3',
                anonymizeIP: true,
              },
            }
          : {}),
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['**/Coming-Soon', '**/404.html'],
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);

            const highPriorityPaths = new Set([
              '/',
              '/about',
              '/blog',
              '/docs/The-Journey',
              '/docs/The-Encyclopaedia',
              '/docs/Context',
            ]);

            return items
              .filter((item) => {
                try {
                  return !new URL(item.url).pathname.includes('/Coming-Soon');
                } catch {
                  return true;
                }
              })
              .map((item) => {
                try {
                  const path =
                    new URL(item.url).pathname.replace(/\/$/, '') || '/';

                  if (path === '/') {
                    return {...item, priority: 1.0};
                  }
                  if (highPriorityPaths.has(path)) {
                    return {...item, priority: 0.8};
                  }
                  if (
                    path.startsWith('/blog/') &&
                    !['/blog/archive', '/blog/authors', '/blog/tags'].includes(
                      path,
                    ) &&
                    !path.startsWith('/blog/tags/')
                  ) {
                    return {...item, priority: 0.75};
                  }
                  if (path.startsWith('/docs/')) {
                    return {...item, priority: 0.7};
                  }
                } catch {
                  // Keep default priority when URL parsing fails.
                }
                return item;
              });
          },
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/archons-social-card.png',
      metadata: [
        {
          name: 'keywords',
          content:
            'Final Fantasy XIV, FFXIV, lore, MSQ, encyclopaedia, A Realm Reborn, Eorzea, narrative guide',
        },
        {property: 'og:site_name', content: "The Archon's Thesis"},
      ],
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: "The Archon's Thesis",
        logo: {
          alt: "The Archon's Thesis",
          src: 'img/archons-logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'journeySidebar',
            position: 'left',
            label: 'Journey',
          },
          {
            type: 'docSidebar',
            sidebarId: 'encyclopaediaSidebar',
            position: 'left',
            label: 'Encyclopaedia',
          },
          {
            type: 'docSidebar',
            sidebarId: 'contextSidebar',
            position: 'left',
            label: 'Context',
          },
          {to: '/lore-index', label: 'Index', position: 'left'},
          {to: '/blog', label: 'Chronicles', position: 'left'},
          {to: '/about', label: 'About', position: 'right'},
          {to: '/about-the-author', label: 'Author', position: 'right'},
          {to: '/tales-from-the-source', label: 'Tales from the Source', position: 'right'},
          {to: '/how-to-use', label: 'How to Use', position: 'right'},
          {to: '/contact', label: 'Contact', position: 'right'},
          {
            href: 'https://github.com/controvi/archons-thesis',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Lore',
            items: [
              {
                label: 'Journey',
                to: '/docs/The-Journey',
              },
              {
                label: 'Encyclopaedia',
                to: '/docs/The-Encyclopaedia',
              },
              {
                label: 'Context',
                to: '/docs/Context',
              },
              {
                label: 'Lore Index',
                to: '/lore-index',
              },
              {
                label: 'Chronicles',
                to: '/blog',
              },
            ],
          },
          {
            title: 'The Project',
            items: [
              {
                label: 'About',
                to: '/about',
              },
              {
                label: 'How to Use',
                to: '/how-to-use',
              },
              {
                label: 'Contact',
                to: '/contact',
              },
              {
                label: 'About the Author',
                to: '/about-the-author',
              },
              {
                label: 'Privacy',
                to: '/privacy',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/controvi/archons-thesis',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} The Archon's Thesis. Unofficial fan project; not affiliated with Square Enix.<br />FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd.<br />© SQUARE ENIX<br />Game assets from the <a href="https://na.finalfantasyxiv.com/lodestone/special/fankit/desktop_wallpaper/4_0/" target="_blank" rel="noopener noreferrer">official FFXIV Fan Kit</a>.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

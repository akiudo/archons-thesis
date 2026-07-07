// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "The Archon's Thesis",
  tagline: 'A narrative companion to the FFXIV Main Scenario Quest',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://controvi.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/archons-thesis/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'controvi', // Usually your GitHub org/user name.
  projectName: 'archons-thesis', // Usually your repo name.

  trailingSlash: false,

  onBrokenLinks: 'throw',

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
        gtag: {
          trackingID: 'G-56JC3LF4X3',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/archons-social-card.svg',
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
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Encyclopaedia',
          },
          {to: '/blog', label: 'Chronicles', position: 'left'},
          {to: '/about', label: 'About', position: 'right'},
          {to: '/about-the-author', label: 'Author', position: 'right'},
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
                label: 'Encyclopaedia',
                to: '/docs/About/introduction',
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
        copyright: `Copyright © ${new Date().getFullYear()} The Archon's Thesis. Unofficial fan project; not affiliated with Square Enix.<br />FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd.<br />© SQUARE ENIX`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

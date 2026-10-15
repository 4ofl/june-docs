import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "june",
  description: "Technical documentation, architecture specifications, and command reference for June Discord utility bot.",
  lastUpdated: true,
  cleanUrls: true,
  appearance: 'dark',
  srcExclude: ['**/README.md'],
  base: process.env.BASE_PATH || '/',

  sitemap: {
    hostname: 'https://docs.june.4ofl.dev'
  },

  transformHead({ pageData }) {
    const rawPath = pageData.relativePath.replace(/(?:index)?\.md$/, '').replace(/\/$/, '');
    const canonicalUrl = `https://docs.june.4ofl.dev/${rawPath ? rawPath + '/' : ''}`;
    const pageTitle = pageData.frontmatter.title || pageData.title || 'june';
    const pageDesc = pageData.frontmatter.description || pageData.description || 'Technical architecture, security model, and command reference for June Discord platform.';
    const formattedTitle = pageTitle === 'june' ? 'june | Discord Utility & Intelligence Platform' : `${pageTitle} | june`;

    // Determine high-resolution OpenGraph card
    let ogImage = 'https://docs.june.4ofl.dev/og/default.png';
    if (pageData.frontmatter.ogImage) {
      ogImage = `https://docs.june.4ofl.dev${pageData.frontmatter.ogImage}`;
    } else if (rawPath === '') {
      ogImage = 'https://docs.june.4ofl.dev/og/home.png';
    } else if (rawPath.startsWith('commands/')) {
      const sub = rawPath.replace(/^commands\/?/, '');
      const categories = ['general', 'osint', 'threat', 'web', 'roleplay'];
      if (categories.includes(sub)) {
        ogImage = `https://docs.june.4ofl.dev/og/cat-${sub}.png`;
      } else if (sub) {
        ogImage = `https://docs.june.4ofl.dev/og/cmd-${sub}.png`;
      } else {
        ogImage = 'https://docs.june.4ofl.dev/og/cat-general.png';
      }
    } else if (rawPath.startsWith('architecture/security')) {
      ogImage = 'https://docs.june.4ofl.dev/og/page-security.png';
    } else if (rawPath.startsWith('architecture/storage')) {
      ogImage = 'https://docs.june.4ofl.dev/og/page-storage.png';
    } else if (rawPath.startsWith('architecture/jmap-mail')) {
      ogImage = 'https://docs.june.4ofl.dev/og/page-jmap.png';
    } else if (rawPath.startsWith('architecture')) {
      ogImage = 'https://docs.june.4ofl.dev/og/page-architecture.png';
    }

    return [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:title', content: formattedTitle }],
      ['meta', { property: 'og:description', content: pageDesc }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:site_name', content: 'June Documentation' }],
      ['meta', { property: 'og:image', content: ogImage }],
      ['meta', { property: 'og:image:width', content: '1200' }],
      ['meta', { property: 'og:image:height', content: '630' }],
      ['meta', { property: 'og:image:type', content: 'image/png' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: formattedTitle }],
      ['meta', { name: 'twitter:description', content: pageDesc }],
      ['meta', { name: 'twitter:image', content: ogImage }],
      ['meta', { name: 'theme-color', content: '#10b981' }]
    ];
  },
  
  head: [
    ['meta', { name: 'theme-color', content: '#10b981' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap' }]
  ],

  themeConfig: {
    siteTitle: 'june',

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },

    editLink: {
      pattern: 'https://github.com/4ofl/june-docs/edit/main/:path',
      text: 'Edit this page on GitHub'
    },
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Architecture', link: '/architecture/' },
      { text: 'Security', link: '/architecture/security' },
      { text: 'Commands', link: '/commands/' },
      { text: 'Platform', link: '/operations/platform' },
      { text: 'Dashboard', link: 'https://june.4ofl.dev/dashboard' }
    ],

    sidebar: [
      {
        text: 'Architecture & Engineering',
        items: [
          { text: 'System Topology & Runtime', link: '/architecture/' },
          { text: 'Security & Hardening', link: '/architecture/security' },
          { text: 'SQLite Storage Engine', link: '/architecture/storage' },
          { text: 'JMAP Ephemeral Mail', link: '/architecture/jmap-mail' }
        ]
      },
      {
        text: 'Command Reference',
        items: [
          { text: 'Overview & Master Matrix', link: '/commands/' },
          { text: 'Getting Started & Access', link: '/commands/getting-started' },
          { text: 'General Utilities', link: '/commands/general' },
          { text: 'OSINT & Reconnaissance', link: '/commands/osint' },
          { text: 'Roleplay Actions', link: '/commands/roleplay' },
          { text: 'Threat Intelligence', link: '/commands/threat' },
          { text: 'Web & Media', link: '/commands/web' }
        ]
      },
      {
        text: 'Platform & Operations',
        items: [
          { text: 'Documentation Engine', link: '/operations/platform' },
          { text: 'REST & Webhook APIs', link: '/operations/api' }
        ]
      },
      {
        text: 'Legal & Compliance',
        items: [
          { text: 'Privacy Policy', link: '/privacy' },
          { text: 'Terms of Service', link: '/terms' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/4ofl/june-docs', ariaLabel: 'GitHub' },
      { icon: 'discord', link: 'https://june.4ofl.dev/dashboard', ariaLabel: 'June Web Dashboard' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Private Discord utility platform, diagnostic engine, and ephemeral mail service.',
      copyright: 'Copyright © 2026 4ofl · June'
    }
  }
})


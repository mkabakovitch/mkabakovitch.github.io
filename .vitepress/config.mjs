import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Michail Kabakovitch on GitHub",
  description: "An entry point for GitHub pages of all public repositories",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/mkabakovitch/mkabakovitch.github.io' }
    ],
    editLink: {
      pattern: 'https://github.com/mkabakovitch/mkabakovitch.github.io/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: 'This is public information, feel free to use it.',
      copyright: 'Copyright © 2024 Michail Kabakovitch'
    },
    lastUpdated: {
      text: 'Updated ',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  }
})

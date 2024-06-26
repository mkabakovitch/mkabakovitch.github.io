import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Michail Kabakovitch",
  description: "An entry point for GitHub pages of all public repositories",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' }
    ],

    sidebar: [
      {
        text: 'Get Started',
        items: [
          { text: 'About', link: '/about' }
        ]
      },
      {
        text: 'Tips and Tricks',
        items: [
          { text: 'Markdown', link: '/markdown' },
          { text: 'Development Environment', link: '/development-environment' }
        ]
      },
      {
        text: 'Knowledge Base',
        items: [
          { text: 'CAP', link: '/cap' },
          { text: 'DevOps', link: '/devops' }
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
      message: 'This information is public, feel free to use it.',
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

# VitePress

## How to use theme specific images in markdown files

Add `html.dark .light-only` and `html:not(.dark) .dark-only` styles to `.vitepress/theme/style.css` **outside** of the the `:root` element:

```CSS{7-12} [.vitepress/theme/style.css]
:root {
  body {
    font-size: 14px;
    font-weight: 400;
  }
}
html.dark .light-only {
  display: none !important;
}
html:not(.dark) .dark-only {
  display: none !important;
}
```

And then in markdown files:

```Markdown
![alt](/dark-mode-image){.dark-only}
![alt](/light-mode-image){.light-only}
```

Switch between light and dark themes to see it in action:

![Moon](/assets/images/full-moon.png){.dark-only}
![Sun](/assets/images/sun.png){.light-only}

Source: [VitePress Discussion](https://github.com/vuejs/vitepress/discussions/3560)

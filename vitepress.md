# VitePress

## How to use theme specific images in markdown files

Add `html.dark .light-only` and `html:not(.dark) .dark-only` styles to `.vitepress/theme/style.css` **outside** of the the `:root` element:

::: code-group

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

:::

And then in markdown files:

```Markdown
![alt](/dark-mode-image){.dark-only}
![alt](/light-mode-image){.light-only}
```

Switch between light and dark themes to see it in action:

![Moon](/assets/images/full-moon.png){.dark-only}
![Sun](/assets/images/sun.png){.light-only}

Source: [VitePress Discussion](https://github.com/vuejs/vitepress/discussions/3560)

## How to use custom fonts

To extend default VitePress theme with custom fonts, follow [official guide](https://vitepress.dev/guide/extending-default-theme#using-different-fonts).

To use fonts from [Google Fonts](https://fonts.google.com), choose the font and click `Get font`:

![Get font](/assets/images/google-fonts-get-font-dark.png){.dark-only}
![Get font](/assets/images/google-fonts-get-font-light.png){.light-only}

Click `Get embed code`:

![Get embed code](/assets/images/google-fonts-get-embed-code-dark.png){.dark-only}
![Get embed code](/assets/images/google-fonts-get-embed-code-light.png){.light-only}

Select `@import` and click `Copy code`:

![Copy code](/assets/images/google-fonts-copy-code-dark.png){.dark-only}
![Copy code](/assets/images/google-fonts-copy-code-light.png){.light-only}

Paste the copied code at the top of the `my-fonts.css` file and specify it for `--vp-font-family-base`:

::: code-group

```CSS{1,6} [my-fonts.css]
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

:root {

  /* Typography */
  --vp-font-family-base: "Poppins", 'Chinese Quotes', 'Inter var', 'Inter', ui-sans-serif,
    system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Helvetica, Arial, 'Noto Sans', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}
```

:::

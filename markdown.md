# Markdown

This section contains information helping to improve documentation structure and readability.

## Markdown extensions

GitHub has a nice guide. Start with [Basic writing and formatting syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax). Check out [Markdown Extensions](https://vitepress.dev/guide/markdown) by VitePress.

## How to escape fenced code blocks

Escape fensed code blocks with quadruple backticks: ` ```` `.

## Syntax highlighting in fenced code blocks

Use syntax highlighting by specifying language after the opening triple backticks ` ``` `:

````
```JSON
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```
````

Output:

```JSON
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

List of available languages: [languages.yaml](https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml)

## How to use colored diffs in code blocks

Using [Colored Diffs in Code Blocks](https://vitepress.dev/guide/markdown#colored-diffs-in-code-blocks) is straightforward. However, it is not clear from the documentation that the instructions `[!code --]` and `[!code --]` must not be prefixed by `//`, but rather with the comment directives for the language of the current code block. So, in case of JavaScript you must use `//`, and for YAML you must use `#`:

```Markdown
build-parameters:
  before-all:
     - builder: custom
       commands:
         - npx ncp db/data gen/srv/srv/data # [!code ++]
         - npx ncp test/data gen/srv/srv/data # [!code ++]
         - npx ncp db.sqlite gen/srv/db.sqlite # [!code ++]
```

This will produce the following output:

```YAML [mta.yaml]
build-parameters:
  before-all:
     - builder: custom
       commands:
         - npx ncp db/data gen/srv/srv/data # [!code ++]
         - npx ncp test/data gen/srv/srv/data # [!code ++]
         - npx ncp db.sqlite gen/srv/db.sqlite # [!code ++]

```

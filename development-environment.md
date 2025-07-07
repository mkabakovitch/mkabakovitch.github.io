# Development Environment

This section contains tips and tricks helping to organize a better development environment.

## How to show hidden files and folders in Finder

In Finder, press **⌘** + **⇧** + **.** (command + shift + period) to toggle showind hidden files and folders.

Source: [Lifehacker - Show Hidden Files on Mac](https://lifehacker.com/tech/show-hidden-files-on-mac)

## How to clean working directory

To clean working directory including removing ignoded files (specified in `.gitignore` file) run, :

```Shell
git clean -dxf
```

- `-d` recurses into subrirectories
- `-f` forces deletion
- `-x` allows removing ignored files

> [!TIP]
> Specify `-n` option for previewing changes: `git clean -dxfn`

Source: [Git Clean Documentation](https://git-scm.com/docs/git-clean)

## How to use emoji and symbols on Mac

You can insert emoji as you type on your Mac, or use the Character Viewer to search for and enter emoji, symbols, accented letters, and characters from other languages.

Source: [Use emoji and symbols on Mac](https://support.apple.com/guide/mac-help/use-emoji-and-symbols-on-mac-mchlp1560/mac).

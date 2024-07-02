# Development Environment

This section contains tips and tricks helping to organize a better development environment.

## How to show hidden files in Finder

Access your Mac's Macintosh HD folder, which you can get by clicking on your Mac's name under Locations in the side tab on the left side of any Finder window. Once you're there, press the following keys: **⌘** + **⇧** + **.** (command + shift + period). Using this keyboard shortcut should make hidden files appear in the current folder you're viewing. The hidden files and folders will be grayed out. Hit the same combination once more when you want to make the folders invisible again.

Source: https://lifehacker.com/tech/show-hidden-files-on-mac

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

Source: https://git-scm.com/docs/git-clean

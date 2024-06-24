# Development Environment

## How to show hidden files in Finder

Access your Mac's Macintosh HD folder, which you can get by clicking on your Mac's name under Locations in the side tab on the left side of any Finder window. Once you're there, press the following keys: ⌘ + ⇧ + . (option + shift + period). Using this keyboard shortcut should make hidden files appear in the current folder you're viewing. The hidden files and folders will be grayed out. Hit ⌘ + ⇧ + . (option + shift + period) once more when you want to make the folders invisible again.

Source: https://lifehacker.com/tech/show-hidden-files-on-mac

## How to clean working directory

To clean working directory removing untracked files run:

```Shell
git clean -dxf
```

- `-d` recurses into subrirectories
- `-f` forces deletion
- `-x` allows removing untracked files

Source: https://git-scm.com/docs/git-clean

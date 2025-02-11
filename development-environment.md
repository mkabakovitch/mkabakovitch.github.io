# Development Environment

This section contains tips and tricks helping to organize a better development environment.

## How to show hidden files and folders in Finder

In Finder, press **⌘** + **⇧** + **.** (command + shift + period) to toggle showind hidden files and folders.

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

## How to override theme for SAPUI5-based applications

Although a theme can be specified globally in the settings of Build Work Zone, is is also possible to override the theme by the using URL parameter `sap-ui-theme` as described in [SAPUI5 documentation](https://sapui5.hana.ondemand.com/#/topic/91f2d03b6f4d1014b6dd926db0e91070). E.g. for SAP CI/CD Service:

```Text
https://mysubaccount.eu10.cicd.cloud.sap/ui/index.html?sap-ui-theme=sap_horizon_dark
```

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

## How to override theme for SAPUI5-based applications

It is also possible to override the theme af a SAPUI5 application by the using URL parameter `sap-ui-theme` as described in [SAPUI5 documentation](https://sapui5.hana.ondemand.com/#/topic/91f2d03b6f4d1014b6dd926db0e91070). E.g. for SAP CI/CD Service:

```Text
https://mysubaccount.eu10.cicd.cloud.sap/ui/index.html?sap-ui-theme=sap_horizon_dark
```

> [!NOTE]
> Alternatively, `sap-theme` parameter could also be used. I could not spot the difference between these two parameters.

Available themes:

| Theme Name          | Technical Name   |
| ------------------- | ---------------- |
| Morning Horizon     | sap_horizon      |
| Evening Horizon     | sap_horizon_dark |
| High Contrast Black | sap_horizon_hcb  |
| High Contrast White | sap_horizon_hcw  |
| Quartz Light        | sap_fiori_3      |
| Quartz Dark         | sap_fiori_3_dark |
| High Contrast Black | sap_fiori_3_hcb  |
| High Contrast White | sap_fiori_3_hcw  |
| Belize              | sap_belize       |
| Belize Deep         | sap_belize_plus  |
| High Contrast Black | sap_belize_hcb   |
| High Contrast White | sap_belize_hcw   |
| Blue Crystal        | sap_bluecrystal  |
| High Contrast Black | sap_hcb          |

Source: [SAPUI5 Documentation](https://sapui5.hana.ondemand.com/#/topic/da0d2e78e5414e199507cd6365d3add2)

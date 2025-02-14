## UI5/SAPUI5/Fiori

## How to override theme for SAPUI5-based applications

It is possible to override the theme of a SAPUI5-based application by the using URL parameter `sap-ui-theme` as described in [SAPUI5 documentation](https://sapui5.hana.ondemand.com/#/topic/91f2d03b6f4d1014b6dd926db0e91070). E.g. for SAP CI/CD Service:

```Text
https://mysubaccount.eu10.cicd.cloud.sap/ui/index.html?sap-ui-theme=sap_horizon_dark
```

> [!NOTE]
> Alternatively, `sap-theme` parameter could also be used. See [SAPUI5 documentation](https://sapui5.hana.ondemand.com/#/topic/e9fc648661d84ed89360bbec3ae02611) for more information.

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

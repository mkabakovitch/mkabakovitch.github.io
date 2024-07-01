# CAP

## How to use custom routes

Sometimes the default route created for a service can be not very nice, e.g. if the label (a segment delimited by `.`) in the name composed by MTA deployer `[org-name]-[space-name]-[module-name].cfapps.[region].hana.omdemand.com` is longer than 63 characters. In this case the name will be truncated and appended with a string guaranteeing uniqueness of the resulting URL. The solution (even [recommended by SAP](https://help.sap.com/docs/btp/sap-business-technology-platform/mta-routes#n1t)) is to specify the name explicitly in the MTA descriptor (`mta.yaml` file):

Instead of using `${default-url}` for `srv-url`, which is added by default:

```YAML{7} [mta.yaml]
modules:
  - name: module-srv
    ...
    provides:
      - name: srv-api
        properties:
          srv-url: ${default-url}
```

Override `srv-url` and add a route with required URL:

```YAML{7,10-11} [mta.yaml]
modules:
  - name: module-srv
    ...
    provides:
      - name: srv-api
        properties:
          srv-url: ${protocol}://${org}-${space}-[required-module-name].${default-domain}
    parameters:
      ...
      routes:
        - route: ${protocol}://${org}-${space}-[required-module-name].${default-domain}
```

Specifying a route prevents the MTA deployer from creating the default one.

A quick reference how placehoders are composed:

| Placeholder         | Description                                                                                                                                                                                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `${default-host}`   | Usually generated using the **[org-name]-[space-name]-[module-name]**                                                                                                                                                                                                         |
| `${default-domain}` | Default shared domain of the landscape, e.g. **cfapps.us10-001.hana.ondemand.com**                                                                                                                                                                                            |
| `${default-uri}`    | The default URI, composed as `${host}`.`${domain}` (host-based routing). Note that `${host}` will be the same as `${default-host}`, unless specified explicitly as a parameter. Similarly, `${domain}` would be the same as `${default-domain}`, unless specified explicitly. |
| `${default-url}`    | The default URL, composed as `${protocol}`://`${default-uri}`. Note that the `${default-uri}` placeholder is resolved as `${host}`.`${domain}` (host-based routing)                                                                                                           |
| `${protocol}`       | Usually defaults to **https**                                                                                                                                                                                                                                                 |

Source: [MultiApps Controller Wiki](https://github.com/cloudfoundry/multiapps-controller/wiki/Supported-Parameters#placeholders).

See [Module-Specific Parameters](https://help.sap.com/docs/btp/sap-business-technology-platform/modules?locale=en-US#module-specific-parameters) for full list of available parameters.

# CAP

## How to use custom routes

Sometimes the default route created for a service can be not very nice, e.g. if the label (a segment) in the name composed by MTA deployer <org-name>-<space-name>-<module-name>.cfapps.<region>.hana.omdemand.com is longer than 36 characters, the name will be truncated and appended with a string guaranteeing uniqueness of the resulting URL. The solution is to specify the name explicitly in the MTA descriptor `mta.yaml` file:

Instead of using `${default-url}` for `srv-url`, which is added by default:

```yaml{7} [mta.yaml]
modules:
  - name: module-srv
    ...
    provides:
      - name: srv-api
        properties:
          srv-url: ${default-url}
```

Override `srv-url` and add a route specifying required URL:

```yaml{7,10-11} [mta.yaml]
modules:
  - name: module-srv
    ...
    provides:
      - name: srv-api
        properties:
          srv-url: ${protocol}://${org}-${space}-bpc.${default-domain}
    parameters:
      ...
      routes:
        - route: ${protocol}://${org}-${space}-bpc.${default-domain}
```

Specifying a route prevents the MTA deployer from creating the default one.

Source: https://github.com/SAP-samples/cf-mta-examples/blob/main/app-routes/mta.yaml

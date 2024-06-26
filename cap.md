# CAP

## How to use custom routes

Sometimes the default route created for a service can be not very nice, e.g. if the label (a segment delimited by `.`) in the name composed by MTA deployer `[org-name]-[space-name]-[module-name].cfapps.[region].hana.omdemand.com` is longer than 63 characters. In this case the name will be truncated and appended with a string guaranteeing uniqueness of the resulting URL. The solution is to specify the name explicitly in the MTA descriptor (`mta.yaml` file):

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
          srv-url: ${protocol}://${org}-${space}-bpc.${default-domain}
    parameters:
      ...
      routes:
        - route: ${protocol}://${org}-${space}-bpc.${default-domain}
```

Specifying a route prevents the MTA deployer from creating the default one.

A quick reference how `default-*` parameters are composed:

```YAML
default-host: ${default-host}     # usually generated using the [org-name]-[space-name]-[module-name]
default-domain: ${default-domain} # default shared domain of the landscape
default-uri: ${default-uri}       # composed by ${default-host}.${default-domain}
protocol: ${protocol}             # usually defaults to "https"
default-url: ${default-url}       # composed of ${protocol}://${default-uri}
```

Source: [SAP-samples/cf-mta-examples/app-routes/mta.yaml](https://github.com/SAP-samples/cf-mta-examples/blob/main/app-routes/mta.yaml)

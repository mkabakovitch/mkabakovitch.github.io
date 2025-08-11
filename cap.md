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

Override `srv-url` and specify the route as [recommended by SAP](https://help.sap.com/docs/btp/sap-business-technology-platform/mta-routes#n1t):

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

## How to use localized messages in TypeScript

For some reasons this example from [CAP Documentation](https://cap.cloud.sap/docs/node.js/cds-i18n#localized-messages) would not work in TypeScript:

::: code-group

```js{4} [srv/cat-service.js]
srv.before('submitOrder', async (req) => {
  let { book: id, quantity } = req.data;
  let { stock } = await SELECT`stock`.from(Books, id);
  if (stock < quantity) req.reject(409, 'ORDER_EXCEEDS_STOCK', { stock, quantity });
});
```

```properties [_i18n/messages.properties]
ORDER_EXCEEDS_STOCK = The order of {quantity} books exceeds available stock {stock}
```

:::

This would work:

::: code-group

```js{4} [srv/cat-service.js]
srv.before('submitOrder', async (req) => {
  let { book: id, quantity } = req.data;
  let { stock } = await SELECT`stock`.from(Books, id);
  if (stock < quantity) req.reject(409, 'ORDER_EXCEEDS_STOCK', [stock, quantity]);
});
```

```properties [_i18n/messages.properties]
ORDER_EXCEEDS_STOCK = The order of {1} books exceeds available stock {0}
```

:::

## How to get actual request path and payload when calling remote services

Put a breakpoint at the following line in the file `node_modules/@sap/cds/libx/_runtime/remote/Service.js`:

::: code-group

```JavaScript{6} [node_modules/@sap/cds/libx/_runtime/remote/Service.js]
class RemoteService extends cds.Service {
  init() {
    ...
    this.on('*', async function on_handler(req, next) {
      ...
      let result = await run(reqOptions, additionalOptions)
      result = typeof query === 'object' && query.SELECT?.one && Array.isArray(result) ? result[0] : result
      return result
    })

    return super.init()
  }
  ...
}
```

:::

Examples of data contained in parameters `reqOptions` and `additionalOptions`:

::: code-group

```JSON [reqOptions (GET)]
{
  method: "GET",
  url: "/ZPP_C_ProductionOrderComponent?$select=Reservation,ReservationItem,ReservationRecordType,Material&$top=1",
  headers: {
    accept: "application/json,text/plain",
    "accept-language": "en",
    "x-correlation-id": "4f1578d5-0be9-4e65-845f-83857aaa6a0d",
  }
}
```

```JSON [reqOptions (POST)]
{
  method: "POST",
  url: "/ZPP_C_MaterialAssignment('c575d561-d7c7-48f2-b0c1-3530fa482102')/_MaterialAssignmentComponent",
  data: {
    MaterialAssignment: "c575d561-d7c7-48f2-b0c1-3530fa482102",
    Reservation: "7",
    ReservationItem: "1",
    ReservationRecordType: "",
    Material: "Donut",
  },
  headers: {
    accept: "application/json,text/plain",
    "accept-language": "en",
    "content-type": "application/json",
    "content-length": 123,
    "x-correlation-id": "0ae34e4d-43a3-446f-be80-5452a78b1134",
  },
}
```

```JavaScript [additionalOptions]
{
  destination: {
    name: "ZPP_PRODUCTION_ORDER_0001",
    url: "https://my123456-api.s4hana.cloud.sap/sap/opu/odata4/sap/zpp_api_production_order_o4/srvd_a2x/sap/zpp_production_order/0001",
    authentication: "BasicAuthentication",
    username: "username",
    password: "***",
  },
  kind: "odata",
  resolvedTarget: {
    ...
  },
  returnType: undefined,
  destinationOptions: {
    useCache: true,
  },
}
```

:::

The `password` element in `destination` contains password in plain text.

## How to deploy CAP application with SQLite database

::: warning
Usage of SQLite database in productive environment is strongly discouraged. See [CAP documentation](https://cap.cloud.sap/docs/guides/databases-sqlite#sqlite-in-production) for more information. However, there are cased when it is feasible to use SQLite, especially during development. For example, when you **must** deploy your application, but you do not want to use your productive database instance.
:::

There are two options for storing data in SQLite database: in **memory** and in **file**.

### Persisting data in memory

::: code-group

```JSON [package.json]
{
  "dependencies": {
    "@cap-js/sqlite": "^1.11.1" // [!code ++]
  },
  "devDependencies": {
    "@cap-js/sqlite": "^1.11.1", // [!code --]
    "ncp": "^2.0.0", // [!code ++]
  },
  "cds" : {
    "requires": {
      "db": { // [!code ++]
        "kind": "sqlite", // [!code ++]
        "impl": "@cap-js/sqlite", // [!code ++]
        "credentials": { // [!code ++]
          "url": ":memory:" // [!code ++]
        } // [!code ++]
      } // [!code ++]
    },
    "features": {
      "in_memory_db": true // [!code ++]
    }
  }
}
```

:::

You need the [ncp](https://www.npmjs.com/package/ncp) package if you want to deploy initial data to the database (see below) and make sure your script runs in both Windows and Linux environments.

Data from `db/data` folder will **not** be automatically loaded to in-memory database after deployment. If you want to load it, you need to include the files into your build artefacts: copy the files from `db/data` to `gen/srv/srv/data` folder (yes, two `srv` nesting levels). You may also copy the files from the `test/data` folder:

::: code-group

```YAML [mta.yaml]
build-parameters:
  before-all:
     - builder: custom
       commands:
         - npx ncp db/data gen/srv/srv/data  # [!code ++]
         - npx ncp test/data gen/srv/srv/data # [!code ++]
```

:::

### Persisting data in file

::: code-group

```JSON [package.json]
{
  "dependencies": {
    "@cap-js/sqlite": "^1.11.1", // [!code ++]
  },
  "devDependencies": {
    "@cap-js/sqlite": "^1.11.1", // [!code --]
    "ncp": "^2.0.0" // [!code ++]
  },
  "cds" : {
    "requires": {
      "db": { // [!code ++]
        "kind": "sqlite", // [!code ++]
        "impl": "@cap-js/sqlite", // [!code ++]
        "credentials": { // [!code ++]
          "url": "db.sqlite" // [!code ++]
        } // [!code ++]
      } // [!code ++]
  }
}
```

:::

As in the in-memory case, you can include files from your `db/data` and `test/data` folders. Additionally, you can include the actual database file `db.sqlite`:

::: code-group

```YAML [mta.yaml]
build-parameters:
  before-all:
     - builder: custom
       commands:
         - npx ncp db/data gen/srv/srv/data # [!code ++]
         - npx ncp test/data gen/srv/srv/data # [!code ++]
         - npx ncp db.sqlite gen/srv # [!code ++]

```

:::

In order to create `db.sqlite` file in your project run:

```Shell
cds deploy
```

## How to set an arbitrary HTTP response status code

Setting error status codes in responses is straightforward:

```JavaScript
req.error(400, 'Invalid input', 'some_field');
req.error(404, 'Not found');
```

See [`req.error()`](https://cap.cloud.sap/docs/node.js/events#req-error) method in CAP documentation.

However, setting **success** codes is not that easy. Such codes as [`200`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/200) or [`204`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/204) will be automatically returned by the framework depending on the response payload, but returning **arbitrary** success codes is not supported.

For example, you may want to call an unbound action implemented in your service from [SAP Job Scheduling Service](https://discovery-center.cloud.sap/protected/index.html#/serviceCatalog/job-scheduling-service) in [asynchronous mode](https://help.sap.com/docs/job-scheduling/sap-job-scheduling-service/asynchronous-mode). In this case the action **must** return status code [`202`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/202).

To set the status code, you can call [`res.sendStatus()`](https://expressjs.com/en/5x/api.html#res.sendStatus) method of the internal `Response` object from underlying **Express** instance:

::: code-group

```TypeScript [ExampleService.ts]
import cds from '@sap/cds';
import HttpUtilities from './HttpUtilities';

export class ExampleService extends cds.ApplicationService {
  init() {
    this.on('exampleAction', this.#onExampleAction.bind(this));
    return super.init();
  }

  async #onExampleAction(req: cds.Request): Promise<void> {
      cds.spawn({}, async () => {
        // Your code to execute asynchronously
      });
      HttpUtilities.setStatus(req, 202);
  }
}
```

```TypeScript [HttpUtilities.ts]
import cds from '@sap/cds';

export class HttpUtilities {
  static setStatus(req: cds.Request, status: number): void {
    if (typeof (req as any).res?.sendStatus === 'function') {
      (req as any).res.sendStatus(status);
    }
  }
}

export default HttpUtilities;

```

:::

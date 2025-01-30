# Postman

## How to create Postman collection based on OData metadata

Install odata-openapi globally:

```Shell
npm install -g odata-openapi
```

Assuming you installed the script globally, and your XML metadata file is `MyMetadata.xml`, then

```Shell
odata-openapi3 MyMetadata.xml
```

will create `MyMetadata.openapi3.json` next to it.

Source: [odata-openapi](https://oasis-tcs.github.io/odata-openapi/lib/).

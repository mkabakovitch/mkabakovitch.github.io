# DevOps

This section contains information about topics related to development operations.

## Resources

[SAP Continuous Integration and Delivery](https://help.sap.com/docs/continuous-integration-and-delivery)

## How to set up SAP Cloud Transport Management service

SAP Cloud Transport Management service is used to transport artefacts (e.g. MTA archives, content or even entire sites in SAP Build Work Zone, standard edition) between different environments.

These transportation activities are:

- Uploading artefacts from source environment to specific transport node in Cloud Transport Management. This is achieved through API calls to the Cloud Transport Management service endpoint. Such calls can be done from a build job in the Continuous Integration and Delivery service on the Release stage (e.g. for transporting MTA archives) or from the Site Manager (e.g. for transporting content of SAP Build Work Zone, standard edition).
- Deploying artefacts stored in transport queues of Cloud Transport Management service to target environment. This is achieved through API calls from the Cloud Transport Management service to endpoints of dedicated deployment services running in the target environment.

The service is a SaaS application, and in order to use it, a subscription to the service must be created. See [Configuring Entitlements to SAP Cloud Transport Management](https://help.sap.com/docs/cloud-transport-management/sap-cloud-transport-management/configuring-entitlements-to-sap-cloud-transport-management).

In addition, in order to enable programmatic access (using API Remote Call), an instance of the service must be created in the subaccount where service is subscribed. See [Creating a Service Instance and a Service Key](https://help.sap.com/docs/cloud-transport-management/sap-cloud-transport-management/creating-service-instance-and-service-key).

> [!TIP]
> Even though the subscription can be created in any subaccount, it makes sense to create subscription in a dedicated "management" subaccount, because:
>
> - Deployment of artefacts in target environments requires destinations, pointing to deployment services running in these environments, to be created in the subaccount where Cloud Transport Management service is subscribed. Keeping these "management" desinations and other "business" destinations isolated provides better overview and security of both "management" and "business" endpoints.
> - Keeping "management" and "business" services isolated provides better transparency of audit, analytics and cost control for software development and delivery infrastructure.

Endpoints are configured either using service keys or as destinations in environments involved into transport management activities, depending on where they are called from.

For automated workflows, where no manual activities are required, the "[...directly in an Application](https://help.sap.com/docs/cloud-transport-management/sap-cloud-transport-management/set-up-environment-to-transport-content-archives-directly-in-application)" approach must be used. This term lokks confusing, but it is used across Cloud Transport Management documentation.

Before any object (transport nodes, transport routes, etc.) is created in Cloud Transport Management, it is required to create corresponding destinations in the subaccount where Cloud Transport Management service is subscribed. These destinations which will be used by Cloud Transport Management to bind transport nodes with the target environments.

### Configuring environments for integration with Cloud Management Service

For every subaccount, where with Cloud Management Service deploys artefacts, a dedicated destination must be created in the subassount where with Cloud Management Service is subscribed. These destinations point to the deployment services running in the target subaccounts. The deployment services are already there, there is no need to create them. See [Creating Destinations Using SAP Cloud Deployment Service with OAuth2Password Authentication](https://help.sap.com/docs/cloud-transport-management/sap-cloud-transport-management/creating-destinations-using-sap-cloud-deployment-service-with-oauth2password-authentication).

> [!WARNING]
> OAuth2Password must be avoid. Instead, it must be possible to use [Content Agent](https://discovery-center.cloud.sap/serviceCatalog/content-agent) service for transporting MTA archives. See [Creating Destinations Using SAP Content Agent Service](https://help.sap.com/docs/cloud-transport-management/sap-cloud-transport-management/creating-destinations-using-sap-content-agent-service). Unfortunately, I could not get it working *yet*.

### Settung up landscape in Cloud Transport Management

### Setting up upload of MTA archives from Continuous Integration and Delivery service into Cloud Management Service

Uploading MTA archives is done directly from the Continuous Integration and Delivery service by using a service key for the Cloud Transport Management service stored as credentials. See See [Creating a Service Instance and a Service Key](https://help.sap.com/docs/cloud-transport-management/sap-cloud-transport-management/creating-service-instance-and-service-key) and [Integrate Cloud Transport Management into Your Job](https://help.sap.com/docs/continuous-integration-and-delivery/sap-continuous-integration-and-delivery/integrate-cloud-transport-management-into-your-job#connect-your-job-with-sap-cloud-transport-management). No destinations in any subaccount are involved.

### Setting up uplod of content and sites from SAP Build Work Zone, standard edition into  Cloud Management Service

There is no need to subscribe to SAP Cloud Transport Management service in the source environment. Only a destination having exact name **ctms_destination** must be created in the source environment as described in [Integrate SAP Cloud Transport Management Service](https://help.sap.com/docs/build-work-zone-standard-edition/sap-build-work-zone-standard-edition/integrate-sap-cloud-transport-management-service).
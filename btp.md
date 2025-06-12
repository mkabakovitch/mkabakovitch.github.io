# Business Technology Platform

## How to add user to Cloud Foundry Org

In Subaccount Cockpit, in **Cloud Foundry Environment** section click **Manage Environment Instance** link, then click **Update**. In **Update Instance** dialog on step **2 (Paramerters)** specify parameters as:

```JSON
{
   "usersToAdd": [
      {
      "email": "john.smith@email.com"
   }
 ]
}
```

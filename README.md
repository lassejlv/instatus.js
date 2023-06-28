# Creating your client

```js
const { InstatusClient } = require("instatus.js");
const client = new InstatusClient({
  apiKey: "<your-api-key>", // head to https://dashboard.instatus.com/developer to get your API key
  apiVersion: "v1", // optional, defaults to v1
  pageId: "<your-page-id>", // optional, defaults to null. but use .getPages() to get your page ID
});
```

# Get pages

```js
(async () => {
  const getPages = await client.getPages();

  console.log(getPages);
  // returns an array of pages
})();
```

# Get components

```js
(async () => {
  const getComponents = await client.getComponents(); // this uses the pageId from the client

  console.log(getComponents);
  // returns an array of components
})();
```

# Get a specific component

```js
(async () => {
  const getComponent = await client.getComponent("<component-id>"); // this uses the pageId from the client, and use .getComponents() to get your component ID

  console.log(getComponent);
  // returns a component
})();
```

# Get incidents

```js
(async () => {
  const getIncidents = await client.getIncidents(); // this uses the pageId from the client

  console.log(getIncidents);
  // returns an array of incidents
})();
```

# Get a specific incident

```js
(async () => {
  const getIncident = await client.getIncident("<incident-id>"); // this uses the pageId from the client, and use .getIncidents() to get your incident ID

  console.log(getIncident);
  // returns an incident
})();
```

# Create an incident

```js
(async () => {
  const createIncident = await client.createIncident({
    name: "Incident name",
    status: "investigating", // can be investigating, identified, monitoring, resolved
    message: "Incident message",
    components: ["<component-id>"], // optional, defaults to null
  }); // this uses the pageId from the client

  console.log(createIncident);
  // returns the created incident
})();
```

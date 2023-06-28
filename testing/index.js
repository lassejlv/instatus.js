const { InstatusClient } = require("../src/index");
const client = new InstatusClient({
  apiKey: "d20e67e75d18b1f090b73152e0d2ccc4",
  apiVersion: "v1",
  pageId: "cljg3124f457533b1n3zei5boff",
});

(async () => {
  const getData = await client.createIncident({
    name: "Test Incident from code2",
    status: "INVESTIGATING", // INVESTIGATING, IDENTIFIED, MONITORING, RESOLVED
    message: "This is a test incident",
    components: ["cljg3124r457545b1n3zzdubchq"],
    statuses: [], // optional
  });

  console.log(getData);
})();

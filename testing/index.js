const { InstatusClient } = require("../src/index");
const client = new InstatusClient({
  apiKey: "",
  apiVersion: "v1",
  pageId: "",
});

(async () => {
  const getData = await client.removeTeammate("");

  console.log(getData);
})();

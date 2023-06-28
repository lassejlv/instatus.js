const axios = require("axios");
const config = require("../utils/config");

class InstatusClient {
  constructor(options) {
    // check for required options
    if (!options.apiKey) {
      throw new Error("client requires an apiKey");
    }

    // Options
    this.apiKey = options.apiKey;
    this.apiVersion = options.apiVersion || config.apiVersion;
    this.pageId = options.pageId || null;

    // httpClient
    this.httpClient = axios.create({
      // https://api.instatus.com/v2
      baseURL: `${config.apiUrl}/${this.apiVersion}`,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  async getUserProfile() {
    const response = await this.httpClient.get("/user");

    // Error handling
    if (response.data.error) {
      throw new Error(response.data.error);
    } else {
      return response.data;
    }
  }

  // get pages
  async getPages() {
    const response = await this.httpClient.get("/pages");

    // Error handling
    if (response.data.error) {
      throw new Error(response.data.error);
    } else {
      return response.data;
    }
  }

  // get components
  async getComponents() {
    const response = await this.httpClient.get(`/${this.pageId}/components`);

    // Error handling
    if (response.data.error) {
      throw new Error(response.data.error);
    } else {
      return response.data;
    }
  }

  // get component
  async getComponent(componentId) {
    if (!componentId) {
      throw new Error("getComponent requires a componentId");
    } else {
      const response = await this.httpClient.get(
        `/${this.pageId}/components/${componentId}`
      );

      // Error handling
      if (response.data.error) {
        throw new Error(response.data.error);
      } else {
        return response.data;
      }
    }
  }

  // get incidents
  async getIncidents() {
    const response = await this.httpClient.get(`/${this.pageId}/incidents`);

    // Error handling
    if (response.data.error) {
      throw new Error(response.data.error);
    } else {
      return response.data;
    }
  }

  // get incident
  async getIncident(incidentId) {
    if (!incidentId) {
      throw new Error("getIncident requires a incidentId");
    } else {
      const response = await this.httpClient.get(
        `/${this.pageId}/incidents/${incidentId}`
      );

      // Error handling
      if (response.data.error) {
        throw new Error(response.data.error);
      } else {
        return response.data;
      }
    }
  }

  // get subscribers
  async getSubscribers() {
    const response = await this.httpClient.get(`/${this.pageId}/subscribers`);

    // Error handling
    if (response.data.error) {
      throw new Error(response.data.error);
    } else {
      return response.data;
    }
  }

  // add subscriber
  async addSubscriber(options) {
    if (!options) {
      throw new Error("addSubscriber requires options");
    } else if (!options.email) {
      throw new Error("addSubscriber requires an email");
    } else {
      try {
        const response = await this.httpClient.post(
          `/${this.pageId}/subscribers`,
          {
            email: options.email,
            all: options.all || false,
            autoConfirm: options.autoConfirm || false,
          }
        );

        return response.data;
      } catch (error) {
        console.error("Error adding subscriber:", error.response.data);

        throw new Error("Failed to add subscriber");
      }
    }
  }

  // delete subscriber
  async deleteSubscriber(subscriberId) {
    if (!subscriberId) {
      throw new Error("deleteSubscriber requires a subscriberId");
    } else {
      try {
        const response = await this.httpClient.delete(
          `/${this.pageId}/subscribers/${subscriberId}`
        );

        return response.data;
      } catch (error) {
        console.error("Error deleting subscriber:", error.response.data);

        throw new Error("Failed to delete subscriber");
      }
    }
  }

  // get teammates
  async getTeammates() {
    const response = await this.httpClient.get(`/${this.pageId}/team`);

    // Error handling
    if (response.data.error) {
      throw new Error(response.data.error);
    } else {
      return response.data;
    }
  }

  // add teammate
  async addTeammate(options) {
    if (!options) {
      throw new Error("addTeammate requires options");
    } else if (!options.email) {
      throw new Error("addTeammate requires an email");
    } else {
      try {
        const response = await this.httpClient.post(`/${this.pageId}/team`, {
          email: options.email,
        });

        return response.data;
      } catch (error) {
        console.error("Error adding teammate:", error.response.data);

        throw new Error("Failed to add teammate");
      }
    }
  }

  // remove teammate
  async removeTeammate(teammateId) {
    if (!teammateId) {
      throw new Error("removeTeammate requires a teammateId");
    } else {
      try {
        const response = await this.httpClient.delete(
          `/${this.pageId}/team/${teammateId}`
        );

        return response.data;
      } catch (error) {
        console.error("Error removing teammate:", error.response.data);

        throw new Error("Failed to remove teammate");
      }
    }
  }

  // create incident
  async createIncident(options) {
    if (!options) {
      throw new Error("createIncident requires options");
    } else if (!options.components || options.components.length < 1) {
      throw new Error("createIncident requires at least one component");
    } else {
      try {
        const response = await this.httpClient.post(
          `/${this.pageId}/incidents`,
          {
            name: options.name || "Test Incident",
            message: options.message || "This is a test incident",
            components: options.components || [null],
            started: new Date().toISOString(),
            status: options.status || "INVESTIGATING",
            notify: options.notify || false,
            statuses: options.statuses || [], // optional
          }
        );

        return response.data;
      } catch (error) {
        console.error("Error creating incident:", error.response.data);
        throw new Error("Failed to create incident");
      }
    }
  }
}

module.exports = {
  InstatusClient: InstatusClient,
};

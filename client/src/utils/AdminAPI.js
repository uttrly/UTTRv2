import axios from "axios";

export default {
  // Gets all bus near geolocation
  addAllRoutes: () => {
    return axios.get(`/admin/busDb/routes`);
  },

};
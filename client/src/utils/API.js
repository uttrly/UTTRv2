import axios from "axios";

export default {
  // Gets all bus near geolocation
  getAllBuses: (lat, lon) => {
    return axios.get(`/api/bus/latlon/${lat}/${lon}`);
  },
  getNextStops: (route, direction, stopId) => {
    return axios.get(`/api/bus/nextstops/${route}/${direction}/${stopId}`)
  },
  search: (route, originStopId, destinationStopId, terminal, previous) => {
    return axios.get(`/api/app/search/${route}/${originStopId}/${destinationStopId}/${terminal}/${previous}`)
  },
  dashboard: (id,email,status) => {
    return axios.get(`/api/app/dashboard?id=${id}&email=${email}&status=${status}`)
  },
  getGoalInfo: (id,email,goalId) => {
    return axios.get(`/api/app/challenge?id=${id}&email=${email}&goalId=${goalId}`)
  },
  createGoal: (userData) => {
    console.log("---- posted ----")
    return axios.post("/api/app/challenge", userData);
  }
};



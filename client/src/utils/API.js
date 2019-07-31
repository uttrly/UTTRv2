import axios from "axios";

export default {
  // Gets all bus near geolocation
  getAllBuses: (lat, lon) => {
    return axios.get(`/api/bus/latlon/${lat}/${lon}`);
  },
  getNextStops: (route, direction, stopId) =>{
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
  submitComment: (id,email,goalID,comment) => {
    return axios.post(`/api/app/comment`, {
      id : id,
      email: email,
      goalID: goalID,
      comment: comment
    })
  },
  submitReport: (id,email,goalID,success) => {
    return axios.post(`/api/app/report`, {
      id : id,
      email: email,
      goalID: goalID,
      success: success
    })
  }
};
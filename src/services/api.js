import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/",
});

const token = localStorage.getItem("token");
api.defaults.headers.common["Authorization"] = token;

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error.code);
    return Promise.reject(error);
  }
);

export default api;

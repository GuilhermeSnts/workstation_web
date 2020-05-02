import axios from "axios";
import store from "../store";
import router from "../router";
import baseURL from "../baseUrl.js";
axios.defaults.baseURL = baseURL;

axios.interceptors.request.use(
  config => {
    const token = store.state.user.token;
    if (token) {
      config.headers["Authorization"] = store.state.user.token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      router.push("/auth");
    }
    return Promise.reject(error);
  }
);

export default axios;

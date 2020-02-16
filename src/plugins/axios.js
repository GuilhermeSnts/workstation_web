import axios from "axios";
import store from "../store";
import router from "../router";
import Vue from "vue";

// axios.defaults.baseURL = "http://3.87.159.233";
axios.defaults.baseURL = "http://localhost:80";

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

Vue.use((Vue.prototype.$http = axios));

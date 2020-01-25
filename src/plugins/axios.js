import axios from "axios";
import store from "../store";
import Vue from "vue";

axios.defaults.headers.common["Authorization"] = store.getters.token;
axios.defaults.baseURL = "http://localhost:3000";

Vue.use({
  install(Vue) {
    Vue.prototype.$http = axios;
  }
});

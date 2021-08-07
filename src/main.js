import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import axios from "./plugins/axios";
import Notify from "vue-notifyjs";

Vue.use((Vue.prototype.$http = axios));
Vue.config.productionTip = false;
Vue.use(Notify, { type: "primary", timeout: 2000 });

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

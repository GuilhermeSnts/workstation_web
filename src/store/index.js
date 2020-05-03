import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import user from "./modules/user.js";
import settings from "./modules/settings.js";
import customers from "./modules/customers.js";
Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {},
  actions: {},
  modules: { user, settings, customers },
  plugins: [createPersistedState()]
});

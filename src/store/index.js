import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import user from "./modules/user.js";
import settings from "./modules/settings.js";
import customers from "./modules/customers.js";
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: true });
Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {},
  actions: {},
  modules: { user, settings, customers },
  plugins: [
    createPersistedState({
      paths: ["user", "settings"],
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ]
});

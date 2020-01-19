import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    settings: {
      sideBar: true,
      client_code: ""
    },
    user: {
      first_name: null,
      token: null
    }
  },
  mutations: {
    setSideBar(state, payload) {
      state.settings.sideBar = payload;
    },
    setClientCode(state, payload) {
      state.settings.client_code = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setToken(state, payload) {
      state.user.token = payload;
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()]
});

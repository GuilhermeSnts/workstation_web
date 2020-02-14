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
      last_name: null,
      token: null,
      username: null
    }
  },
  getters: {
    token(state) {
      return state.user.token;
    }
  },
  mutations: {
    setSideBar(state, payload) {
      state.settings.sideBar = payload;
    },
    setClientCode(state, payload) {
      state.settings.client_code = payload;
    },
    setUser(state, { first_name, last_name, token, username }) {
      state.user.first_name = first_name;
      state.user.last_name = last_name;
      state.user.token = token;
      state.user.username = username;
    },
    setToken(state, payload) {
      state.user.token = payload;
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()]
});

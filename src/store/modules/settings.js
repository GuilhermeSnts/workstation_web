export default {
  namespaced: true,
  state: {
    sideBar: true,
    clientCode: "",
    version: process.env.PACKAGE_VERSION
  },
  getters: {
    getVersion(state) {
      return state.version;
    },
    getClientCode(state) {
      return state.clientCode;
    },
    getSideBar(state) {
      return state.sideBar;
    }
  },
  mutations: {
    setSideBar(state, payload) {
      state.sideBar = payload;
    },
    setClientCode(state, payload) {
      state.clientCode = payload;
    }
  }
};

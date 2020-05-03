import axios from "@/plugins/axios";
export default {
  namespaced: true,
  state: {
    first_name: null,
    last_name: null,
    token: null,
    username: null
  },
  getters: {
    getFullName(state) {
      return state.first_name + " " + state.last_name;
    },
    getFirstName(state) {
      return state.first_name;
    },
    getLastName(state) {
      return state.last_name;
    },
    getUsername(state) {
      return state.username;
    },
    getToken(state) {
      return state.token;
    },
    getUserData(state) {
      return {
        first_name: state.first_name,
        last_name: state.last_name,
        token: state.token,
        username: state.username
      };
    }
  },
  mutations: {
    setUserData(state, { first_name, last_name, token, username }) {
      state.first_name = first_name;
      state.last_name = last_name;
      state.token = token;
      state.username = username;
    },
    setToken(state, payload) {
      state.token = payload;
    }
  },
  actions: {
    doClearUserData(context) {
      context.commit("setUserData", {
        first_name: "",
        last_name: "",
        token: "",
        username: ""
      });
    },
    doLogIn(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/authenticate", { ...data })
          .then(res => {
            context.commit("setUserData", { ...res.data });
            resolve(res.data);
          })
          .catch(err => {
            reject(err.response.data.msg);
          });
      });
    }
  }
};

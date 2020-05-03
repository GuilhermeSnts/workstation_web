import axios from "@/plugins/axios";

export default {
  namespaced: true,
  state: {
    customersList: [],
    customersPerPage: 10,
    currentPage: 1,
    lastSync: null
  },
  getters: {
    getCustomersList(state) {
      return state.customersList;
    },
    getCustomersPerPage(state) {
      return state.customersPerPage;
    },
    getCurrentPage(state) {
      return state.currentPage;
    },
    getLastSync(state) {
      return state.lastSync;
    },
    getTotalPages(state) {
      return Math.floor(state.customersList.length / state.customersPerPage);
    },
    getCustomerPageItens(state) {
      let begin = state.customersPerPage * state.currentPage - 1;
      let end = begin + state.customersPerPage;
      return state.customersList.slice(begin, end);
    }
  },
  mutations: {
    setCustomers(state, payload) {
      state.customersList = payload;
    },
    setLastSync(state, payload) {
      state.lastSync = payload;
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },
    setCustomersPerPage(state, payload) {
      state.customersPerPage = payload;
    }
  },

  actions: {
    doGetCustomers(context) {
      axios(`/customers?page=${context.state.currentPage}`).then(res => {
        context.commit("setCustomers", res.data.customers);
        context.commit("setLastSync", new Date());
      });
    },
    doChangePage(context, payload) {
      context.commit("setCurrentPage", payload);
      context.dispatch("doGetCustomers");
    }
  }
};

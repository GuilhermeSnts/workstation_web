import axios from "@/plugins/axios";

export default {
  namespaced: true,
  state: {
    customersList: [],
    customersPerPage: 20,
    currentPage: 1,
    lastSync: null,
    totalCustomers: 0,
    loadingCustomers: false
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
    getTotalCustomers(state) {
      return state.totalCustomers;
    },
    getTotalPages(state) {
      return Math.floor(state.totalCustomers.length / state.customersPerPage);
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
    addCustomers(state, payload) {
      state.customersList.push(...payload);
    },
    setLastSync(state, payload) {
      state.lastSync = payload;
    },
    setLoadingCustomers(state, payload) {
      state.loadingCustomers = payload;
    },
    setTotalCustomers(state, payload) {
      state.totalCustomers = payload;
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
        context.commit("setTotalCustomers", res.data.count);
        context.commit("addCustomers", res.data.customers);
        context.commit("setLastSync", new Date());
        context.commit("setLoadingCustomers", true);
      });
    },
    doChangePage(context, payload) {
      context.commit("setCurrentPage", payload);
      context.dispatch("doGetCustomers");
    },
    doAddPage({ state, commit, dispatch }) {
      if (
        Math.floor(state.totalCustomers / state.customersPerPage) >
          state.currentPage &&
        state.loadingCustomers
      ) {
        commit("setLoadingCustomers", true);
        commit("setCurrentPage", state.currentPage + 1);
        dispatch("doGetCustomers");
      }
    }
  }
};

<template>
  <v-autocomplete
    v-model="customer_id"
    :loading="customerLoading"
    label="Cliente"
    item-text="name"
    :search-input.sync="customerToSearch"
    :items="customersSearchList"
    hide-no-data
    hide-selected
    item-value="id"
    dense
    outlined
    required
    @change="emitCustomer()"
  ></v-autocomplete>
</template>

<script>
export default {
  name: "customer-auto-complete",

  data: () => ({
    customerToSearch: "",
    customersSearchList: [],
    customerLoading: false,
    customer_id: 0
  }),

  methods: {
    emitCustomer() {
      this.$emit("change", this.customer_id);
    },

    searchCustomer() {
      this.customerLoading = true;
      this.$http(`/customers/search/${this.customerToSearch}`)
        .then(res => (this.customersSearchList = res.data))
        .catch(err => alert(err))
        .finally((this.customerLoading = false));
    }
  },

  watch: {
    customerToSearch() {
      if (!this.customerToSearch) {
        this.customersSearchList.length = 0;
        this.customer_id = "";
      }
      if (this.customersSearchList.length > 0) return;
      if (this.customerLoading) return;
      this.customerLoading = true;
      this.searchCustomer();
    }
  }
};
</script>

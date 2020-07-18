<template>
  <v-autocomplete
    :loading="customerLoading"
    :search-input.sync="customerToSearch"
    :items="customersSearchList"
    @change="$emit('change', customer_id)"
    @click:append-outer="$emit('search')"
    append-outer-icon="mdi-magnify"
    v-model="customer_id"
    label="Cliente"
    item-text="name"
    hide-no-data
    hide-selected
    item-value="id"
    dense
    outlined
    required
  ></v-autocomplete>
</template>

<script>
export default {
  name: "FilterCustomer",

  data: () => ({
    customerToSearch: "",
    customersSearchList: [],
    customer_id: "",
    customerLoading: false
  }),

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
  },

  methods: {
    searchCustomer() {
      this.customerLoading = true;
      if (this.customerToSearch != "") {
        this.$http(`/customers/search/${this.customerToSearch}`)
          .then(res => (this.customersSearchList = res.data))
          .catch(err => alert(err))
          .finally((this.customerLoading = false));
      }
    }
  }
};
</script>

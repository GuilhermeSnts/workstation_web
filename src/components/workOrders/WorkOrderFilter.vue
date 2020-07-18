<template>
  <FilterCustomer @change="changeFilterToCustomer" @search="getWorkOrders()" />
</template>

<script>
import FilterCustomer from "../customers/FilterCustomer";
export default {
  data: () => ({
    search: "",
    dialog: false,
    filterByCustomer: false,
    filters: ""
  }),

  components: {
    FilterCustomer
  },

  methods: {
    changeFilterToCustomer(value) {
      this.filters = `customer_id=${value}`;
    },

    getWorkOrders() {
      this.$http(`/work-orders/find?${this.filters}`).then(res => {
        this.$emit("filter", res.data);
        this.dialog = false;
      });
    }
  }
};
</script>

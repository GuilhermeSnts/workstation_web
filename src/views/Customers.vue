<template>
  <div class="customers">
    <p>{{ getTotalCustomers }} clientes cadastrados</p>
    <create-customer @update="doGetCustomers" />
    <CustomerListItem
      v-for="(item, index) in getCustomersList"
      :key="index"
      :customer="item.name"
      :email="item.email"
      :telephone="item.telephone"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CreateCustomer from "@/components/CreateCustomer.vue";
import CustomerListItem from "@/components/customers/CustomerListItem.vue";
export default {
  data: () => ({
    scrolled: false,
    headers: [
      {
        text: "Cliente",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "e-mail", value: "email" },
      { text: "Telefone", value: "phone" }
    ],
    selectedCustomer: []
  }),

  components: {
    CreateCustomer,
    CustomerListItem
  },

  computed: {
    customer() {
      let customer = this.selectedCustomer;
      if (customer.length) {
        return customer[0];
      } else {
        return {};
      }
    },
    ...mapGetters("customers", ["getCustomersList", "getTotalCustomers"])
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) +
          window.innerHeight >=
        document.documentElement.offsetHeight
      ) {
        this.doAddPage();
      }
    },
    ...mapActions("customers", ["doGetCustomers", "doAddPage"])
  },

  mounted() {
    this.doGetCustomers();
  }
};
</script>

<style lang="sass" scoped>
.customers
  display: flex
  flex-flow: column
  justify-content: center
  vertical-align: middle
  min-width: 300px
  max-width: 500px
</style>

<template>
  <v-content>
    <v-card color="blue">
      <v-card-text>
        <div>clientes:</div>
        <p class="display-3">
          {{ getTotalCustomers }}
        </p>
      </v-card-text>
      <v-card-actions>
        <create-customer @update="doGetCustomers" />
        <search-customer />
      </v-card-actions>
    </v-card>

    <v-card class="mt-4">
      <v-list two-line nav color="grey darken-3">
        <v-list-item
          :to="'/customers/' + item.id"
          v-for="(item, index) in getCustomersList"
          :key="index"
        >
          <v-list-item-avatar color="blue">
            <v-icon color="white">mdi-account</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.name" />
            <v-list-item-subtitle v-text="item.email" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-content>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CreateCustomer from "@/components/customers/CreateCustomer.vue";
import SearchCustomer from "@/components/customers/SearchCustomer.vue";
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
    SearchCustomer
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

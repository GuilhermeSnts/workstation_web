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

    <v-card class="mt-4" color="grey darken-3">
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
      <v-pagination class="ma-4" :length="getTotalPages"></v-pagination>
    </v-card>
  </v-content>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CreateCustomer from "@/components/customers/CreateCustomer.vue";
import SearchCustomer from "@/components/customers/SearchCustomer.vue";
import scrollToLoadMore from "@/mixins/scrollToLoadMore.js";

export default {
  mixins: [scrollToLoadMore],

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
    ...mapGetters("customers", [
      "getCustomersList",
      "getTotalCustomers",
      "getCurrentPage",
      "getTotalPages"
    ])
  },

  methods: {
    loadMore() {
      this.doAddPage();
    },

    ...mapActions("customers", ["doGetCustomers", "doAddPage"])
  },

  mounted() {
    this.doGetCustomers();
  }
};
</script>

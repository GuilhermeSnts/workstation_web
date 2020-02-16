<template>
  <v-row align="center" justify="center" class="ma-4">
    <v-col cols="12" sm="12" lg="8">
      <v-card>
        <v-card-title> Clientes - {{ totalItens }} </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="customers"
            :items-per-page="5"
            single-select
            hide-default-footer
            v-model="selectedCustomer"
            item-key="id"
            show-select
            height="300"
          >
          </v-data-table>
          <v-pagination
            v-model="page"
            :length="totalPages"
            total-visible="6"
          ></v-pagination>
        </v-card-text>
        <v-card-actions>
          <create-customer @update="getCustomers" />
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="12" sm="12" lg="4">
      <v-card>
        <v-list-item v-if="customer.name">
          <v-list-item-avatar color="blue">
            <v-icon class="white--text">mdi-account-tie</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline">{{
              customer.name
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              customer.document_number
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <div v-show="customer.name">
            <p>
              <v-icon color="blue" left>mdi-email-outline</v-icon>
              {{ customer.email || "Não infomado" }}
            </p>
            <p>
              <v-icon color="blue" left>mdi-phone-outline</v-icon>
              {{ customer.phone || "Não infomado" }}
            </p>
            <p>
              <v-icon color="blue" left>mdi-map-marker-radius</v-icon
              >{{ customer.street || "Não infomado" }},{{
                customer.address_number
              }}
              {{ customer.complement }} {{ customer.neighborhood }}
              {{ customer.city }}
            </p>
          </div>

          <div v-show="!customer.name">
            <p class="text-center">
              <v-icon color="darkgray" large>mdi-account-tie</v-icon>
            </p>
            <p class="text-center gray--text">
              Selecione um cliente para ver suas informações
            </p>
          </div>
        </v-card-text>

        <v-divider v-show="customer.name"></v-divider>
        <v-card-actions v-show="customer.name">
          <v-btn text color="blue">
            <v-icon left>mdi-account-edit</v-icon>
            Editar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import CreateCustomer from "@/components/CreateCustomer.vue";
export default {
  data: () => ({
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
    customers: [],
    totalItens: 0,
    page: 1,
    selectedCustomer: []
  }),

  components: {
    CreateCustomer
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
    totalPages() {
      return Math.round(this.totalItens / 5);
    }
  },

  methods: {
    getCustomers() {
      this.$http(`/customers?page=${this.page}`).then(res => {
        this.customers = res.data.customers;
        this.totalItens = res.data.count;
      });
    }
  },
  watch: {
    page() {
      this.getCustomers();
    }
  },
  mounted() {
    this.getCustomers();
  }
};
</script>

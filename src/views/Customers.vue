<template>
  <v-row align="center" justify="center" class="ma-4">
    <v-col cols="12" sm="12" lg="8">
      <v-card>
        <v-card-title>
          Clientes
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="customers"
            :items-per-page="5"
            single-select
            v-model="selectedCustomer"
            item-key="name"
            show-select
          >
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <create-customer @update="getCustomers" />
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="12" sm="12" lg="4">
      <v-card min-height="400">
        <div v-show="customer.name">
          <v-list-item>
            <v-list-item-avatar color="blue">
              <v-icon class="white--text">mdi-account-tie-outline</v-icon>
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
            <p><b>Email:</b> {{ customer.email }}</p>
            <p><b>Telefone:</b> {{ customer.email }}</p>
            <p>
              <b>Endereço:</b> {{ customer.street }},{{
                customer.address_number
              }}
              {{ customer.complement }}
            </p>
            <p><b>Bairro:</b> {{ customer.neighborhood }}</p>
            <p><b>Cidade:</b> {{ customer.city }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="blue">
              <v-icon left>mdi-account-edit</v-icon>
              Editar
            </v-btn>
          </v-card-actions>
        </div>
        <div v-show="!customer.name">
          <v-card-text>
            <p class="text-center">
              <v-icon color="darkgray" large>mdi-account-tie</v-icon>
            </p>
            <p class="text-center gray--text">
              Selecione um cliente para ver suas informações
            </p>
          </v-card-text>
        </div>
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
    }
  },

  methods: {
    getCustomers() {
      this.$http("/customers").then(res => (this.customers = res.data));
    }
  },
  mounted() {
    this.getCustomers();
  }
};
</script>

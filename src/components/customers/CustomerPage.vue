<template>
  <v-content>
    <v-btn text class="mb-4" small to="/customers"
      ><v-icon left>mdi-arrow-left</v-icon> voltar</v-btn
    >
    <v-alert dense border="left" type="warning" v-if="emptyFields.length"
      >Existem campos não preenchidos. favor entrar em contato com o cliente e
      completar seus dados.</v-alert
    >
    <v-card class="mx-auto" color="grey darken-3">
      <v-img
        src="https://i.pinimg.com/564x/2d/49/f1/2d49f140a4e73ae2c29e6591d316c5b2.jpg"
        height="150px"
        dark
      >
      </v-img>
      <v-card-text>
        <p class="headline">{{ customer.name }}</p></v-card-text
      >
      <v-chip
        small
        class="ml-4 mb-4 mt-n4"
        :color="customer.is_company ? 'purple' : 'green'"
        >{{ customer.is_company ? "Pessoa Jurídica" : "Pessoa Física" }}</v-chip
      >
      <div class="ml-4">
        <edit-customer
          @update="getCustomer()"
          :data="customer"
          :id="customer.id"
        />
      </div>
      <v-list two-line color="grey darken-3">
        <customer-data-item :data="customer.email" icon="mdi-email" />
        <customer-data-item :data="customer.phone" icon="mdi-phone" />
        <customer-data-item
          :data="customer.document_number"
          icon="mdi-card-account-details"
        />
        <v-divider inset></v-divider>
        <customer-data-item :address="address" icon="mdi-map-marker" />
      </v-list>
    </v-card>
  </v-content>
</template>

<script>
import CustomerDataItem from "./CustomerDataItem.vue";
import EditCustomer from "./EditCustomer.vue";
export default {
  name: "customer-page",

  data: () => ({
    customer: {},
    address: {},
    customerLoading: false
  }),

  components: {
    CustomerDataItem,
    EditCustomer
  },

  methods: {
    getCustomer() {
      this.$http(`/customer/${this.$route.params.id}`)
        .then(res => {
          this.customer = res.data;
          this.address = {
            address_number: res.data.address_number,
            street: res.data.street,
            city: res.data.city,
            postal_code: res.data.postal_code,
            state: res.data.state,
            neighborhood: res.data.neighborhood,
            complement: res.data.complement
          };
        })
        .catch(err => alert(err))
        .finally((this.customerLoading = false));
    }
  },
  computed: {
    emptyFields() {
      let customer = Object.entries(this.customer);
      let empties = customer.filter(i => i[1] == "");
      return empties.map(i => ({ field: i[0] }));
    }
  },

  mounted() {
    this.getCustomer();
  }
};
</script>

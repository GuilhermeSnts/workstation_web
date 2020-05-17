<template>
  <v-dialog v-model="dialog" width="400" scrollable>
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">
        <v-icon left>mdi-magnify</v-icon>
        Pesquisar
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        Pesquisar por clientes
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-4">
        <customer-auto-complete @change="customer_id = $event" />
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn @click="dialog = false" text>cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="blue"
          @click="gotoCustomerPage()"
          :disabled="!customer_id"
        >
          <v-icon left>mdi-magnify</v-icon> Pesquisar</v-btn
        >
      </v-card-actions>

      <v-snackbar v-model="snackbar" :timeout="3000">
        {{ snackbarText }}
        <v-btn color="blue" text @click="snackbar = false">
          Fechar
        </v-btn>
      </v-snackbar>
    </v-card>
  </v-dialog>
</template>

<script>
import CustomerAutoComplete from "./CustomerAutoComplete.vue";
export default {
  data: () => ({
    dialog: false,
    valid: true,
    snackbar: false,
    snackbarText: "",
    customer_id: ""
  }),
  components: {
    CustomerAutoComplete
  },

  methods: {
    gotoCustomerPage() {
      this.$router.push(`/customers/${this.customer_id}`);
    }
  }
};
</script>

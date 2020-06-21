<template>
  <v-dialog width="500" scrollable v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn text color="blue darken-1" v-on="on"
        ><v-icon left>mdi-filter</v-icon> Busca Avançada
      </v-btn>
    </template>

    <v-card class="grey darken-3">
      <v-card-title>Busca Avançada</v-card-title>
      <v-card-text>
        <v-checkbox label="Pesquisar por cliente" />
        <v-text-field label="Nome do cliente" />
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="dialog = false">cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="blue" @click="getWorkOrders()">buscar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    search: "",
    dialog: false
  }),

  methods: {
    getWorkOrders() {
      let filters = "";
      this.$http(`/work-orders/find?${filters}`).then(res => {
        this.$emit("filter", res.data);
      });
    }
  }
};
</script>

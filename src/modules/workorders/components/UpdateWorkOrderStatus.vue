<template>
  <v-dialog width="350" scrollable v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn color="blue" text v-on="on">trocar status </v-btn>
    </template>
    <v-card class="grey darken-3">
      <v-card-title>Alterar Status {{ internalCode }} </v-card-title>
      <v-card-text>
        <p>
          O status será atualizado e uma mensagem será gravada na linha do tempo
          desta Ordem de serviço indicando o usuário que a alterou, data, hora e
          qual status estava antes da sua alteração.
        </p>
        <v-select
          solo
          light
          label="Status"
          :items="statusList"
          item-text="status"
          item-value="id"
          v-model="statusToChange"
        ></v-select>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text @click="dialog = false">cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn dark color="blue" @click="changeStatus()">concluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    statusList: [],
    statusToChange: ""
  }),
  props: {
    internalCode: String,
    id: String
  },
  methods: {
    getStatusList() {
      this.$http(`/work-order-status`)
        .then(res => {
          let validOptions = res.data.filter(i => !i.type);
          this.statusList = validOptions;
        })
        .catch(err => alert(err));
    },
    changeStatus() {
      this.$http
        .put(`/work-order/status/${this.id}`, {
          status_id: this.statusToChange
        })
        .then(() => {
          this.dialog = false;
          this.showSnackbar("Status foi atualizado");
        })
        .catch(error => this.showSnackbar(error.message.data));
    },
    showSnackbar(message) {
      alert(message);
    }
  },
  mounted() {
    this.getStatusList();
  }
};
</script>

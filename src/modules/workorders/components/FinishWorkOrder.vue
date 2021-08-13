<template>
  <v-dialog width="500" scrollable v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn color="blue" text v-on="on">finalizar </v-btn>
    </template>

    <v-card class="grey darken-3">
      <v-card-title>Finalizar {{ internalCode }} </v-card-title>
      <v-card-text class="pt-4">
        <v-form v-model="finishForm" ref="form" lazy-validation>
          <v-textarea
            :rules="[v => !!v || 'É necessário preencher este campo']"
            dense
            filled
            label="Conclusão"
            v-model="work_performed"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text @click="dialog = false">cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn dark color="secondary" @click="validate()">concluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    finishForm: false,
    work_performed: "",
    snackbar: false,
    snackbarText: ""
  }),
  props: {
    internalCode: String,
    id: String
  },
  methods: {
    sendFinish() {
      this.$http
        .put(`/work-order/finish/${this.id}`, {
          work_performed: this.work_performed
        })
        .then(() => {
          this.dialog = false;
        })
        .catch(error => this.showSnackbar(error.message.data));
    },
    showSnackbar(message) {
      alert(message);
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.sendFinish();
      } else {
        this.snackbar = true;
        this.snackbarText = "Existem campos obrigatórios não preenchidos";
      }
    }
  }
};
</script>

<style></style>

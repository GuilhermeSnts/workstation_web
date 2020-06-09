<template>
  <v-dialog v-model="dialog" width="350" scrollable>
    <template v-slot:activator="{ on }">
      <v-btn color="blue" text v-on="on">trocar encarregado</v-btn>
    </template>
    <v-card class="grey darken-3">
      <v-card-title>Alterar encarregado {{ internalCode }} </v-card-title>
      <v-card-text>
        <p>
          O Encarregado será atualizado e uma mensagem será gravada na linha do
          tempo desta Ordem de serviço indicando o usuário que a alterou, data,
          hora e quem era encarregado antes da sua alteração.
        </p>
        <v-select
          solo
          light
          label="Encarregado"
          :items="userList"
          item-text="username"
          item-value="id"
          v-model="newUserInCharge"
        ></v-select>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text @click="dialog = false">cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn dark color="blue" @click="changeInCharge()">concluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    userList: [],
    newUserInCharge: ""
  }),

  props: {
    internalCode: String,
    id: String
  },
  methods: {
    getUsers() {
      this.$http("/users")
        .then(res => {
          this.userList = res.data;
        })
        .catch(() => {
          this.snackbar = true;
          this.snackbarText = "Houve um erro ao obter a lista de usuários";
        });
    },
    changeInCharge() {
      this.$http
        .put(`/work-order/${this.id}`, {
          in_charge: this.newUserInCharge
        })
        .then(() => {
          this.dialog = false;
          this.showSnackbar("O encarregado foi substituído");
        })
        .catch(error => this.showSnackbar(error.message.data));
    },
    showSnackbar(message) {
      alert(message);
    }
  },

  mounted() {
    this.getUsers();
  }
};
</script>

<template>
  <v-expansion-panel>
    <v-expansion-panel-header> Trocar minha senha </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form
        ref="form"
        @submit.prevent="changePassword()"
        v-model="form"
        lazy-validation
      >
        <v-text-field
          label="Senha Atual"
          v-model="currentPassword"
          type="password"
          outlined
          dense
          append-icon="mdi-lock"
          :rules="passwordRules"
        ></v-text-field>
        <v-text-field
          label="Senha"
          v-model="password"
          type="password"
          outlined
          dense
          append-icon="mdi-lock"
          :rules="passwordRules"
        ></v-text-field>
        <v-text-field
          label="Confirmação de senha"
          v-model="passwordConfirmation"
          type="password"
          outlined
          dense
          append-icon="mdi-lock"
          :rules="passwordConfirmationRules"
        ></v-text-field>
        <v-btn type="" color="primary" :loading="loading">Alterar senha</v-btn>
      </v-form>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "ChangePasswordPanel",
  data: () => ({
    form: null,
    currentPassword: "",
    password: "",
    passwordConfirmation: "",
    loading: false
  }),
  computed: {
    passwordRules() {
      return [
        v => !!v || "Campo obrigatório",
        v =>
          (v && v.length >= 8) || "Sua senha deve ter pelo menos 8 caracteres."
      ];
    },
    passwordConfirmationRules() {
      return [
        v => !!v || "Campo obrigatório",
        v => (v && v === this.password) || "Senhas não coincidem"
      ];
    }
  },
  methods: {
    changePassword() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$http
          .post(`/user/change-password`, {
            password: this.password,
            currentPassword: this.currentPassword
          })
          .then(() => {
            this.$notify({
              message: "Sua senha foi alterada!",
              type: "success"
            });
          })
          .catch(() => {
            this.$notify({
              message: "Ocorreu um erro ao alterar sua senha",
              type: "danger"
            });
          })
          .finally(() => (this.loading = false));
      }
    }
  }
};
</script>

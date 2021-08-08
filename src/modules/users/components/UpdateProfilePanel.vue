<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      Trocar informações do perfil
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form
        ref="form"
        @submit.prevent="changeProfile()"
        v-model="form"
        lazy-validation
      >
        <v-text-field
          label="Nome"
          v-model="name"
          outlined
          dense
          append-icon="mdi-account"
          :rules="nameRules"
        ></v-text-field>

        <v-text-field
          label="E-mail"
          v-model="email"
          outlined
          dense
          append-icon="mdi-email"
          :rules="emailRules"
        ></v-text-field>

        <v-text-field
          label="Senha Atual"
          v-model="currentPassword"
          type="password"
          outlined
          dense
          append-icon="mdi-lock"
          :rules="nameRules"
        ></v-text-field>

        <v-btn type="submit" color="primary">Alterar dados</v-btn>
      </v-form>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "UpdateProfilePanel",
  data: () => ({
    form: null,
    name: "",
    email: "",
    currentPassword: "",
    loading: false
  }),
  computed: {
    ...mapGetters("user", ["getUserData"]),
    nameRules() {
      return [
        v => !!v || "Campo obrigatório",
        v => (v && v.length >= 8) || "Mínimo de 8 caracteres."
      ];
    },
    emailRules() {
      return [
        v => !!v || "Campo obrigatório",
        v => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || "E-mail inválido"
      ];
    }
  },
  mounted() {
    this.email = this.getUserData.email;
    this.name = `${this.getUserData.first_name} ${this.getUserData.last_name ||
      ""}`;
  },
  methods: {
    ...mapMutations("user", ["setFirstName", "setLastName", "setEmail"]),
    changeProfile() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const first_name = this.name.split(" ")[0];
        const last_name = this.name.replace(first_name, "");
        this.$http
          .put(`/user`, {
            email: this.email,
            first_name: first_name,
            last_name: last_name,
            currentPassword: this.currentPassword
          })
          .then(() => {
            this.setFirstName(first_name);
            this.setLastName(last_name);
            this.setEmail(this.email);
            this.$notify({
              message: "Sua senha foi alterada!",
              type: "success"
            });
          })
          .catch(() => {
            this.$notify({
              message:
                "Ocorreu um erro ao alterar sua senha, tente novamente mais tarde!",
              type: "danger"
            });
          })
          .finally(() => (this.loading = false));
      }
    }
  }
};
</script>

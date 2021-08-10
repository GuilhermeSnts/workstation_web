<template>
  <v-row>
    <v-col cols="12" xl="12" md="6">
      <h1>Criação de usuário</h1>

      <v-form
        ref="form"
        class="mt-4"
        @submit.prevent="createUser"
        v-model="form"
        lazy-validation
      >
        <h5 class="mb-4">Perfil</h5>

        <v-row :no-gutters="this.$vuetify.breakpoint.mobile">
          <v-col cols="12" xs="12" sm="6">
            <v-text-field
              label="Nome"
              v-model="user.first_name"
              outlined
              dense
              append-icon="mdi-account"
              :rules="nameRules"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <v-text-field
              label="Sobrenome"
              v-model="user.last_name"
              outlined
              dense
              append-icon="mdi-account"
              :rules="nameRules"
            />
          </v-col>
        </v-row>

        <v-text-field
          label="E-mail"
          v-model="user.email"
          outlined
          dense
          append-icon="mdi-email"
          :rules="emailRules"
        ></v-text-field>

        <h5 class="mb-4">Autenticação</h5>

        <v-row :no-gutters="this.$vuetify.breakpoint.mobile">
          <v-col cols="12" xs="12" sm="6">
            <v-text-field
              label="Login"
              v-model="user.username"
              outlined
              dense
              append-icon="mdi-account-lock"
              :rules="loginRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <v-text-field
              label="Senha"
              v-model="user.password"
              outlined
              dense
              append-icon="mdi-lock"
              type="password"
              :rules="loginRules"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-switch
          v-if="getUserData.is_admin"
          label="Perfil administrador"
          v-model="user.is_admin"
          outlined
          dense
        ></v-switch>

        <v-switch
          label="Perfil gerente"
          v-model="user.is_manager"
          outlined
          dense
        ></v-switch>
        <v-switch
          label="Usuário ativo"
          v-model="user.is_active"
          outlined
          dense
        ></v-switch>

        <v-btn type="submit" color="primary" :loading="loading"
          >Criar usuário</v-btn
        >
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserEdit",
  data: () => ({
    form: null,
    loading: false,
    user: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      reports_to: null,
      is_admin: false,
      is_manager: false,
      is_active: true
    }
  }),
  computed: {
    ...mapGetters("user", ["getUserData"]),
    nameRules() {
      return [
        v => !!v || "Campo obrigatório",
        v => (v && v.length >= 3) || "Mínimo de 3 caracteres."
      ];
    },
    loginRules() {
      return [
        v => !!v || "Campo obrigatório",
        v => (v && v.length >= 3) || "Mínimo de 3 caracteres."
      ];
    },
    emailRules() {
      return [
        v => !!v || "Campo obrigatório",
        v => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || "E-mail inválido"
      ];
    }
  },
  methods: {
    createUser() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$http
          .post(`/users`, this.user)
          .then(() => {
            this.$notify({
              message: "Usuário criado!",
              type: "success"
            });
          })
          .catch(() => {
            this.$notify({
              message:
                "Ocorreu um erro ao criar o usuário, tente novamente mais tarde!",
              type: "danger"
            });
          })
          .finally(() => (this.loading = false));
      }
    }
  }
};
</script>

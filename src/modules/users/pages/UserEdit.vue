<template>
  <v-row>
    <v-col cols="12" xl="12" md="6">
      <h1>{{ user.first_name }} {{ user.last_name }}</h1>

      <p class="my-4 gray--text">
        Última atualização:
        <span class="secondary--text">
          {{ updated_at }}
        </span>
      </p>

      <v-form
        ref="form"
        class="mt-4"
        @submit.prevent="changeProfile"
        v-model="form"
        lazy-validation
      >
        <v-text-field
          label="Nome"
          v-model="user.first_name"
          outlined
          dense
          append-icon="mdi-account"
          :rules="nameRules"
        ></v-text-field>

        <v-text-field
          label="Sobrenome"
          v-model="user.last_name"
          outlined
          dense
          append-icon="mdi-account"
          :rules="nameRules"
        ></v-text-field>

        <v-text-field
          label="E-mail"
          v-model="user.email"
          outlined
          dense
          append-icon="mdi-email"
          :rules="emailRules"
        ></v-text-field>

        <v-text-field
          label="Login"
          v-model="user.username"
          outlined
          dense
          append-icon="mdi-account"
          :rules="loginRules"
        ></v-text-field>

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

        <v-btn type="submit" color="primary">Alterar dados</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import dayjs from "dayjs";

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
      is_admin: false,
      is_manager: false,
      is_active: false,
      updated_at: new Date()
    }
  }),
  mounted() {
    this.getUser();
  },
  computed: {
    updated_at() {
      return dayjs(this.user.updated_at).format("DD/MM/YYYY hh:mm");
    },
    ...mapGetters("user", ["getUserData"]),
    id() {
      return this.$route.params.id;
    },
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
    getUser() {
      this.loading = true;
      this.$http
        .get(`/user/${this.id}`)
        .then(({ data }) => {
          this.user = data;
        })
        .catch(() => {
          this.$notify({
            message: "Ocorreu um erro ao tentar buscar a lista de usuários.",
            type: "danger"
          });
        })
        .finally(() => (this.loading = false));
    },
    changeProfile() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$http
          .post(`/user/${this.id}`, this.user)
          .then(() => {
            this.$notify({
              message: "Usuário alterado!",
              type: "success"
            });
          })
          .catch(() => {
            this.$notify({
              message:
                "Ocorreu um erro ao alterar esse usuário, tente novamente mais tarde!",
              type: "danger"
            });
          })
          .finally(() => (this.loading = false));
      }
    }
  }
};
</script>

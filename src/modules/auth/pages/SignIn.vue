<template>
  <v-row justify="center" align="middle">
    <v-col cols="12" xs="12" sm="6" md="4" xl="2">
      <v-card class="surface">
        <v-card-text class="pl-8 pr-8 ">
          <v-row class="mb-4 mx-auto" align="center" justify="center">
            <div>
              <v-img src="@/assets/logo.svg" width="100"></v-img>
            </div>
          </v-row>

          <p class="text-center headline mb-10">Boas-vindas de volta!</p>

          <v-form @submit.prevent="login()" v-model="valid" lazy-validation>
            <v-text-field
              label="Código do cliente"
              v-model="client_code"
              :rules="[rules.required]"
              outlined
              dense
              append-icon="mdi-office-building"
            ></v-text-field>

            <v-text-field
              label="Usuário"
              v-model="username"
              :rules="[rules.required]"
              outlined
              dense
              append-icon="mdi-account"
            ></v-text-field>

            <v-text-field
              label="Senha"
              v-model="password"
              type="password"
              outlined
              dense
              :rules="[rules.required]"
              append-icon="mdi-lock"
            ></v-text-field>

            <v-btn
              class="mt-4"
              color="primary"
              :loading="isLoading"
              type="submit"
              block
              >Entrar</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "SignIn",
  data: () => ({
    isLoading: false,
    valid: true,
    client_code: "",
    username: "",
    password: "",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`
    }
  }),

  computed: {
    ...mapGetters("user", ["getToken"])
  },

  methods: {
    ...mapMutations("settings", ["setClientCode"]),
    ...mapActions("user", ["doClearUserData", "doLogIn"]),

    login() {
      this.isLoading = true;
      this.doLogIn({
        client_code: this.client_code,
        username: this.username,
        password: this.password
      })
        .then(() => {
          this.setClientCode(this.client_code);
          this.$router.push("/");
        })
        .catch(error => {
          this.showSnackbar(error);
        })
        .finally(() => (this.isLoading = false));
    }
  },

  mounted() {
    this.doClearUserData();
  }
};
</script>

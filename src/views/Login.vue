<template>
  <v-container fluid class="fill-height">
    <v-layout justify-center align-center>
      <v-card width="400" min-height="300">
        <v-card-text>
          <p class="text-center headline">Login</p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="pl-8 pr-8 ">
          <v-form
            @submit.prevent="login()"
            v-model="valid"
            :lazy-validation="lazy"
          >
            <v-row class="pa-n2 ma-n4 mx-auto " align="center" justify="center">
              <v-col xs="6" sm="6" md="6" lg="6" xl="6">
                <v-text-field
                  label="cliente"
                  v-model="client_code"
                  outlined
                  dense
                  required
                ></v-text-field> </v-col
            ></v-row>

            <v-text-field
              label="usuario"
              v-model="username"
              outlined
              dense
              required
            ></v-text-field>

            <v-text-field
              label="senha"
              v-model="password"
              type="password"
              outlined
              dense
              required
            ></v-text-field>

            <v-btn color="blue" :loading="isLoading" type="submit" block
              >Login</v-btn
            >
          </v-form>
          <v-btn class="mt-6" text small color="blue">
            Esqueceu a senha?
          </v-btn>
        </v-card-text>
      </v-card>
    </v-layout>

    <v-snackbar v-model="snackbar" :timeout="3000">
      {{ snackbarMessage }}
      <v-btn color="pink" text @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    snackbar: false,
    valid: true,
    snackbarMessage: "",
    client_code: "",
    username: "",
    password: ""
  }),
  methods: {
    login() {
      let data = {
        client_code: this.client_code,
        username: this.username,
        password: this.password
      };
      this.isLoading = true;
      this.$http
        .post("/authenticate", { ...data })
        .then(res => {
          this.$store.commit("setUser", res.data);
          this.$store.commit("setClientCode", this.client_code);
          this.$router.push("/");
        })
        .catch(err => this.showSnackbar(err.response.data)) //replace with snackbar
        .finally((this.isLoading = false));
    },
    clearData() {
      this.$store.commit("setToken", null);
    },
    showSnackbar(msg) {
      this.snackbar = true;
      this.snackbarMessage = msg;
    },
    rememberLastClientCode() {
      this.client_code = this.$store.state.settings.client_code;
    }
  },
  mounted() {
    this.clearData();
    this.rememberLastClientCode();
  }
};
</script>

<style></style>

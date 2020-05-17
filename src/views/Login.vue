<template>
  <IntratecBackground>
    <IntratecCard>
      <v-card-text class="pl-8 pr-8 ">
        <v-row class="mb-10 mx-auto " align="center" justify="center">
          <div>
            <v-img src="@/assets/intratec.png" width="75"></v-img>
          </div>
        </v-row>

        <p class="text-center headline mb-10">Log in</p>

        <v-form @submit.prevent="login()" v-model="valid" lazy-validation>
          <v-row class="pa-n2 ma-n4 mx-auto " align="center" justify="center">
            <v-col xs="6" sm="6" md="6" lg="6" xl="6">
              <v-text-field
                label="cliente"
                v-model="client_code"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
          </v-row>

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
        <v-btn v-if="false" class="mt-6" text small color="blue">
          Esqueceu a senha?
        </v-btn>
      </v-card-text>
    </IntratecCard>

    <v-snackbar v-model="snackbar" :timeout="3000">
      {{ snackbarMessage }}
      <v-btn color="pink" text @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </IntratecBackground>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import IntratecBackground from "@/components/IntratecBackground.vue";
import IntratecCard from "@/components/IntratecCard.vue";
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

  components: {
    IntratecBackground,
    IntratecCard
  },

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
    },

    showSnackbar(msg) {
      this.snackbar = true;
      this.snackbarMessage = msg;
    }
  },

  mounted() {
    this.doClearUserData();
  }
};
</script>

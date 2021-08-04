<template>
  <v-row>
    <v-col cols="12" xs="12" sm="8" md="6" lg="4">
      settings
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Account",
  data: () => ({
  }),

  computed: {
    ...mapGetters("user", ["getUserData"]),
    ...mapGetters("settings", ["getSideBar"]),

    user() {
      return this.getUserData;
    }
  }
};
</script>

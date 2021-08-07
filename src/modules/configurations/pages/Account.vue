<template>
  <v-row>
    <v-col cols="12" xs="12" sm="8" md="6" lg="4">
      <v-avatar size="62" class="mx-auto" color="primary">
        {{ user.first_name.charAt(0).toUpperCase() }}
      </v-avatar>

      <p class="headline">{{ user.first_name }} {{ user.last_name }}</p>
      <p class="primary--text">
        <span>
          <v-icon small color="secondary">mdi-account</v-icon>
        </span>
        {{ user.username }}
      </p>
      <p class="primary--text mb-4 mt-n4">
        <span>
          <v-icon small color="secondary">mdi-email</v-icon>
        </span>
        {{ user.email }}
      </p>

      <v-expansion-panels light v-model="panels">
        <ChangePasswordPanel />
        <UpdateProfilePanel />
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import ChangePasswordPanel from "../components/ChangePasswordPanel.vue";
import UpdateProfilePanel from "../components/UpdateProfilePanel.vue";

export default {
  name: "Account",
  data: () => ({
    panels: null
  }),
  components: {
    ChangePasswordPanel,
    UpdateProfilePanel
  },
  computed: {
    ...mapGetters("user", ["getUserData"]),
    ...mapGetters("settings", ["getSideBar"]),

    user() {
      return this.getUserData;
    }
  }
};
</script>

<template>
  <v-content>
    <v-card class="mx-auto" color="grey darken-3">
      <v-card-text>
        <v-avatar size="62" class="mx-auto" color="primary">
          {{ user.first_name.charAt(0).toUpperCase() }}
        </v-avatar>
      </v-card-text>
      <v-card-text>
        <p class="headline">{{ user.first_name }}</p>
        <p class="blue--text mt-n4">@{{ user.username }}</p>
      </v-card-text>
    </v-card>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Account",
  components: {},
  computed: {
    ...mapGetters("user", ["getUserData"]),
    ...mapGetters("settings", ["getSideBar"]),

    user() {
      return this.getUserData;
    }
  }
};
</script>

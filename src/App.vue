<template>
  <v-app>
    <app-bar v-if="hasUser"></app-bar>
    <side-bar v-if="hasUser"></side-bar>
    <v-main>
      <notifications></notifications>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar";
import SideBar from "./components/SideBar";
export default {
  name: "App",

  components: {
    AppBar,
    SideBar
  },
  computed: {
    hasUser() {
      let user = this.$store.state.user;
      return Boolean(user.token);
    },
    route() {
      return this.$route;
    }
  }
};
</script>
<style src="vue-notifyjs/themes/material.css"></style>

<style lang="sass">
.theme--dark.v-application
  background-color: var(--v-background-base, #333333) !important

.theme--dark.v-application
  background-color: var(--v-background-base, #eeeeee) !important
</style>

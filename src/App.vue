<template>
  <v-app>
    <app-bar v-if="hasUser"></app-bar>
    <side-bar v-if="hasUser"></side-bar>
    <router-view></router-view>
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

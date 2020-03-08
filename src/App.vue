<template>
  <v-app>
    <app-bar v-if="hasUser"></app-bar>
    <side-bar v-if="hasUser"></side-bar>
    <v-content>
      <v-container fluid class="fill-height">
        <v-row no-gutters align="start" justify="start">
          <div class="headline">
            <v-icon left>{{ route.meta.icon }}</v-icon>
            {{ route.meta.title }}
          </div>
        </v-row>

        <v-layout justify-center align-center>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
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

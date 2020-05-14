<template>
  <v-app>
    <side-bar v-if="hasUser"></side-bar>
    <div class="fullheight">
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
import SideBar from "./components/SideBar";
export default {
  name: "App",

  components: {
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

<style scoped>
.fullheight {
  height: 100vh;
  width: 100vw;
}
</style>

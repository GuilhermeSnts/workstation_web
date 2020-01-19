<template>
  <v-navigation-drawer mini-variant app v-model="sideBar">
    <v-list dense nav>
      <v-list-item to="/">
        <v-list-item-action>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    sideBar: {
      get() {
        return this.$store.state.settings.sideBar;
      },
      set(value) {
        this.$store.commit("setSideBar", value);
      }
    }
  }
};
</script>

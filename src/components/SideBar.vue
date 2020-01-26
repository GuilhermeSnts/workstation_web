<template>
  <v-navigation-drawer mini-variant app v-model="sideBar">
    <v-list dense nav v-for="(item, index) in menu" :key="index">
      <v-list-item :to="item.route">
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    menu: [
      { icon: "mdi-view-dashboard", text: "Dashboard", route: "/" },
      { icon: "mdi-account-multiple", text: "Customers", route: "/customers" },
      {
        icon: "mdi-file-document-box-check-outline",
        text: "Work Orders",
        route: "/work-orders"
      }
    ]
  }),

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

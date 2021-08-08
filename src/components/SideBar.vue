<template>
  <v-navigation-drawer
    app
    v-model="sideBar"
    permanent
    expand-on-hover
    color="primary"
  >
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
import { mapMutations, mapGetters } from "vuex";
export default {
  data: () => ({
    defaultMenu: [
      { icon: "mdi-view-dashboard", text: "Dashboard", route: "/" },
      { icon: "mdi-domain", text: "Clientes", route: "/customers" },
      {
        icon: "mdi-notebook",
        text: "Ordens de Serviço",
        route: "/work-orders"
      }
    ],
    managerMenu: [
      {
        icon: "mdi-account-group",
        text: "Usuários",
        route: "/users"
      }
    ]
  }),

  methods: {
    ...mapMutations("settings", ["setSideBar"])
  },

  computed: {
    ...mapGetters("settings", ["getSideBar"]),
    ...mapGetters("user", ["getUserData"]),
    menu() {
      const menu = [...this.defaultMenu];
      if (this.getUserData.is_manager || this.getUserData.is_admin) {
        menu.push(this.managerMenu);
      }
      return menu.flat();
    },
    sideBar: {
      get() {
        return this.getSideBar;
      },
      set(value) {
        this.setSideBar(value);
      }
    }
  }
};
</script>

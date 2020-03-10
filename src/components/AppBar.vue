<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="sideBar = !sideBar"></v-app-bar-nav-icon>

    <div class="d-flex align-center">
      <v-toolbar-title><b>T2</b> Manager</v-toolbar-title>
    </div>

    <v-spacer></v-spacer>

    <v-menu bottom left dark>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-card width="300">
        <v-list>
          <v-list-item>
            <v-list-item-avatar color="blue">
              {{ user.first_name.charAt(0).toUpperCase() }}
              <!-- <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img> -->
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ user.first_name }} </v-list-item-title>
              <v-list-item-subtitle>online </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider dark></v-divider>

        <v-list nav dense>
          <v-list-item v-for="(item, i) in menu" :key="i" :to="item.route">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    menu: [
      { icon: "mdi-account", text: "Conta", route: "/account" },
      { icon: "mdi-power", text: "Logoff", route: "/auth" }
    ]
  }),
  computed: {
    user() {
      return this.$store.state.user;
    },
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

<template>
  <v-app-bar app dark dense>
    <div class="d-flex align-center">
      <v-toolbar-title>
        <v-img src="@/assets/logo.svg" width="50" />
      </v-toolbar-title>
      <b class="ml-4">Work Suite</b>
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
          <v-list-item
            active-class="secondary"
            v-for="(item, i) in menu"
            :key="i"
            :to="item.route"
            exact
          >
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
import { mapMutations, mapGetters } from "vuex";
export default {
  data: () => ({
    menu: [
      { icon: "mdi-account", text: "Conta", route: "/settings/account" },
      { icon: "mdi-cogs", text: "Configurações", route: "/settings" },
      { icon: "mdi-power", text: "Logoff", route: "/signin" }
    ]
  }),
  methods: {
    ...mapMutations("settings", ["setSideBar"])
  },

  computed: {
    ...mapGetters("user", ["getUserData"]),
    ...mapGetters("settings", ["getSideBar"]),

    user() {
      return this.getUserData;
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

<template>
  <v-navigation-drawer app v-model="sideBar">
    <v-list dense nav v-for="(item, index) in menu" :key="index">
      <v-list-item :to="item.route">
        <v-list-item-action>
          <f-icon :icon="item.icon" />
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
import FIcon from "@/components/FIcon";
export default {
  data: () => ({
    menu: [
      { icon: "activity", text: "Dashboard", route: "/" },
      { icon: "users", text: "Customers", route: "/customers" },
      {
        icon: "inbox",
        text: "Work Orders",
        route: "/work-orders"
      },
      {
        icon: "life-buoy",
        text: "Tickets",
        route: "/tickets"
      }
    ]
  }),
  components: {
    FIcon
  },

  methods: {
    ...mapMutations("settings", ["setSideBar"])
  },

  computed: {
    ...mapGetters("settings", ["getSideBar"]),

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

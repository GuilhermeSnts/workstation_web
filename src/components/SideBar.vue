<template>
  <div class="sidebar">
    <div class="middle">
      <IntratecSidebarButton
        @click="goto(item.route)"
        v-for="(item, index) in menu"
        :key="index"
        :icon="item.icon"
        :to="item.route"
      />
    </div>
    <div class="bottom">
      <IntratecSidebarButton icon="power" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import IntratecSidebarButton from "@/components/IntratecSidebarButton";
export default {
  data: () => ({
    isActive: true,
    windowSize: 0,
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
    IntratecSidebarButton
  },

  methods: {
    ...mapMutations("settings", ["setSideBar"]),
    resizeHandler() {
      this.windowSize = document.documentElement.clientWidth;
    }
  },

  computed: {
    ...mapGetters("settings", ["getSideBar"]),

    screensize() {
      let screen = this.windowSize;
      if (screen > 600) {
        return "widescreen";
      } else {
        return "mobile";
      }
    },

    sideBar: {
      get() {
        return this.getSideBar;
      },
      set(value) {
        this.setSideBar(value);
      }
    }
  },
  created() {
    window.addEventListener("resize", this.resizeHandler());
  }
  // destroyed() {
  //   window.removeEventListener("resize");
  // }
};
</script>

<style lang="sass" scoped>
@mixin flexColumn
  display: flex
  flex-direction: column
  justify-content: center
  vertical-align: middle
  align-items: center

@mixin flexRow
  display: flex
  flex-direction: row

@media (max-width: 600px)
  .sidebar
    background: red
    width: 100vh
    height: 60px
    @include flexRow
    .middle
      @include flexRow

@media (min-width: 600px)
  .sidebar
    background: blue
    width: 60px
    height: 100vh
    @include flexColumn
    .middle
      @include flexColumn

.sidebar
  position: fixed
  z-index: 99
  background: rgba(0,0,0,0.4)
  top: 0
  left: 0
</style>

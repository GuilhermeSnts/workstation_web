<template>
  <div @click="click()" class="button">
    <FIcon :icon="icon" />
  </div>
</template>

<script>
import FIcon from "@/components/FIcon.vue";
export default {
  name: "IntratecSidebarButton",
  props: {
    icon: String,
    to: String
  },
  components: {
    FIcon
  },
  methods: {
    click() {
      if (this.to) {
        this.$router.push(this.to);
      }
      this.$emit("click");
    }
  }
};
</script>

<style lang="sass" scoped>
.button
  box-sizing: border-box
  cursor: pointer
  padding: 8px
  margin: 4px
  border-radius: 3px
  background: rgba(0,0,0,0.8)
  display: flex
  vertical-align: middle
  justify-items: center
  align-content: center
</style>

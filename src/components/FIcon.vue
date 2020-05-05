<template>
  <i :data-feather="icon" :class="size"></i>
</template>

<script>
import feather from "feather-icons";
export default {
  props: {
    icon: String,
    size: String
  },
  mounted() {
    feather.replace();
  }
};
</script>

<style lang="sass" scoped>
.small
  height: 15px
.big
  height: 30px
</style>

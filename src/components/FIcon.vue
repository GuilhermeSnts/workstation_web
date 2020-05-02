<template>
  <i :data-feather="icon"></i>
</template>

<script>
import feather from "feather-icons";
export default {
  props: {
    icon: String
  },
  mounted() {
    feather.replace();
  }
};
</script>

<style></style>

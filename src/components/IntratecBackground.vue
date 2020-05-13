<template>
  <div class="background">
    <slot />
  </div>
</template>

<script>
export default {
  name: "intratecBackground"
};
</script>

<style scoped>
.background {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  vertical-align: middle;
  justify-content: center;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)),
    url("../assets/login_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

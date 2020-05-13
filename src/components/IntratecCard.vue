<template>
  <div class="card">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card {
  width: 400px;
  min-height: 300px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
}
</style>

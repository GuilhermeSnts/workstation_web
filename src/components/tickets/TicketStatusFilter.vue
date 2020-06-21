<template>
  <div>
    <v-chip
      class="mr-2"
      :outlined="active != 'all'"
      @click="setActiveStatus('all')"
      color="grey"
    >
      Todas
    </v-chip>

    <v-chip
      v-for="(item, index) in items"
      :key="index"
      class="mr-2"
      :outlined="active != item.status"
      @click="setActiveStatus(item.status)"
      :color="item.color"
    >
      {{ item.status }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    items: Array
  },

  data: () => ({
    active: "all"
  }),

  methods: {
    setActiveStatus(status) {
      this.active = status;
      this.$emit("change", this.active);
    }
  }
};
</script>

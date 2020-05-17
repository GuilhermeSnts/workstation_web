<template>
  <v-list-item>
    <v-list-item-icon>
      <v-icon color="blue">{{ icon }}</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title v-if="!isAddress">{{ data }}</v-list-item-title>
      <div v-if="isAddress">
        <v-list-item-title>
          {{ address.street }}, {{ address.complement }}- {{ address.number }}
        </v-list-item-title>
        <v-list-item-title>
          {{ address.neighborhood }} - {{ address.city }}
        </v-list-item-title>
      </div>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "customer-data-item",
  props: {
    icon: String,
    data: String,
    address: Object
  },
  computed: {
    isAddress() {
      return Boolean(this.address);
    }
  }
};
</script>

<template>
  <v-content>
    <v-card color="grey">{{ ticket }}</v-card>
  </v-content>
</template>

<script>
export default {
  data: () => ({
    ticket: {}
  }),

  computed: {
    internalCode() {
      return this.$route.params.id;
    }
  },

  methods: {
    getTicket() {
      this.$http(`/tickets/find?internal_code=${this.internalCode}`)
        .then(result => {
          this.ticket = result.data;
        })
        .catch(err => alert(err));
    }
  },
  mounted() {
    this.getTicket();
  }
};
</script>

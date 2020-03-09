<template>
  <v-container>
    <v-row align="center" justify="center" class="mb-8">
      <create-ticket @update="getTickets()"></create-ticket>
    </v-row>
    <v-row
      align="center"
      justify="center"
      v-for="(ticket, index) in tickets"
      :key="index"
      class="mb-4"
    >
      <v-card min-width="310px">
        <v-card-text>
          <v-row class="mb-n6">
            <v-col>
              <p class="headline">#{{ ticket.internal_code }}</p>
            </v-col>
            <v-col>
              <p class="text-right">
                <v-chip small>{{ ticket.status }}</v-chip>
              </p>
            </v-col>
          </v-row>
          <div class="blue--text mb-2">{{ created_by }}</div>
          <p>{{ ticket.title }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="blue">Atender</v-btn>
          <v-btn text color="blue">Ver</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import CreateTicket from "@/components/CreateTicket";
export default {
  components: {
    CreateTicket
  },

  data: () => ({
    tickets: []
  }),

  methods: {
    getTickets() {
      this.$http("/tickets")
        .then(result => (this.tickets = result.data))
        .catch(err => alert(err));
    }
  },

  mounted() {
    this.getTickets();
  }
};
</script>

<style></style>

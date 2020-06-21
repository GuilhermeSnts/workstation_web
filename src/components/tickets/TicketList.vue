<template>
  <v-content>
    <v-card color="blue">
      <v-card-text>
        <div>Tickets:</div>
        <p class="display-3">
          {{ totalTickets }}
        </p>
      </v-card-text>

      <v-card-actions>
        <create-ticket @update="getTickets()"></create-ticket>
      </v-card-actions>
    </v-card>

    <v-card color="grey darken-3" class="mt-4">
      <v-card-text>
        <v-row>
          <v-col cols="12" xs="6" sm="6" md="6">
            <TicketFilter />
          </v-col>
        </v-row>
        <v-row>
          <TicketStatusFilter :items="statusList" @change="filterStatus" />
        </v-row>

        <v-list nav color="grey darken-3">
          <v-list-item
            v-for="(item, index) in ticketsFiltered"
            :key="index"
            :to="'/tickets/' + item.internal_code"
          >
            <v-list-item-avatar>
              <v-icon
                class="white--text"
                :class="statusColor(item.status)"
                v-text="'mdi-ticket'"
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="item.internal_code" />
              <v-list-item-subtitle v-text="item.title" />
              <v-list-item-subtitle v-text="item.customer_name" />
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text>
                {{ item.created_at | date }}
              </v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-pagination
          class="ma-4"
          :length="totalPages || 0"
          @next="getTickets"
          @previous="getTickets"
          @input="getTickets"
          v-model="currentPage"
        ></v-pagination>
      </v-card-text>
    </v-card>
  </v-content>
</template>

<script>
import CreateTicket from "./CreateTicket";
import TicketFilter from "./TicketFilter";
import TicketStatusFilter from "./TicketStatusFilter";
import dayjs from "dayjs";

export default {
  components: {
    CreateTicket,
    TicketFilter,
    TicketStatusFilter
  },

  data: () => ({
    tickets: [],
    totalTickets: 0,
    currentPage: 1,
    ticketsPerPage: 5,
    statusList: [],
    ActiveStatusFilter: "all"
  }),

  computed: {
    totalPages() {
      return Math.round(this.totalTickets / this.ticketsPerPage);
    },

    ticketsFiltered() {
      if (this.ActiveStatusFilter === "all") {
        return this.tickets;
      } else {
        return this.tickets.filter(t => t.status === this.ActiveStatusFilter);
      }
    }
  },

  methods: {
    getTickets(value) {
      this.$http(`/tickets?page=${value || this.currentPage}`)
        .then(result => {
          this.tickets = result.data.tickets;
          this.totalTickets = result.data.count;
        })
        .catch(err => alert(err));
    },

    getStatus() {
      this.$http("/ticket-status")
        .then(result => (this.statusList = result.data))
        .catch(err => alert(err));
    },

    statusColor(status) {
      let st = this.statusList.find(s => s.status === status);
      return st.color;
    },

    filterStatus(status) {
      this.ActiveStatusFilter = status;
    }
  },

  mounted() {
    this.getTickets();
    this.getStatus();
  },

  filters: {
    date(value) {
      return dayjs(value).format("DD/MM/YYYY");
    }
  }
};
</script>

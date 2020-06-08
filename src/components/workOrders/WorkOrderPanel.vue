<template>
  <v-content>
    <v-tabs background-color="primary" dark>
      <v-tab>
        <v-icon v-text="'mdi-information-outline'" left />
        Informações</v-tab
      >
      <v-tab>
        <v-icon v-text="'mdi-history'" left />
        Histórico</v-tab
      >

      <v-tab-item>
        <WorkOrderInfo :wo="wo" :userInCharge="userInCharge" />
      </v-tab-item>

      <v-tab-item>
        <WorkOrderTimeline :wo="wo" :WorkOrderNotes="WorkOrderNotes" />
      </v-tab-item>
    </v-tabs>
  </v-content>
</template>

<script>
import WorkOrderInfo from "@/components/workOrders/WorkOrderInfo.vue";
import WorkOrderTimeline from "@/components/workOrders/WorkOrderTimeline.vue";
export default {
  components: {
    WorkOrderInfo,
    WorkOrderTimeline
  },

  data: () => ({
    wo: {},
    userInCharge: {},
    WorkOrderNotes: []
  }),

  methods: {
    getWorkOrder() {
      let internalCode = this.$route.params.internal_code;
      this.$http(`/work-orders/find?internal_code=${internalCode}`)
        .then(res => (this.wo = res.data))
        .then(() => {
          if (this.wo.in_charge) {
            this.getUser();
          }
          this.getWorkOrderNotes();
        })
        .catch(err => alert(err));
    },
    getUser() {
      this.$http(`/user/${this.wo.in_charge}`)
        .then(res => (this.userInCharge = res.data))
        .catch(err => alert(err));
    },
    getWorkOrderNotes() {
      this.$http(`/work-order-notes/${this.wo.id}`)
        .then(res => {
          this.WorkOrderNotes = res.data;
        })
        .catch(err => alert(err));
    }
  },
  mounted() {
    this.getWorkOrder();
  }
};
</script>

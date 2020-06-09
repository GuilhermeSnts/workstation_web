<template>
  <v-content>
    <v-btn text class="mb-4" small to="/work-orders"
      ><v-icon left>mdi-arrow-left</v-icon> voltar</v-btn
    >

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
        <WorkOrderTimeline :wo="wo" />
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
    userInCharge: {}
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
        })
        .catch(err => alert(err));
    },
    getUser() {
      this.$http(`/user/${this.wo.in_charge}`)
        .then(res => (this.userInCharge = res.data))
        .catch(err => alert(err));
    }
  },
  mounted() {
    this.getWorkOrder();
  }
};
</script>

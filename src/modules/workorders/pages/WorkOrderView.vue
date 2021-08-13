<template>
  <v-row>
    <v-col cols="12" xl="12" md="6">
      <WorkOrderPanel />
    </v-col>
  </v-row>
</template>

<script>
import WorkOrderPanel from "../components/WorkOrderPanel.vue";

export default {
  name: "WorkOrderView",
  components: {
    WorkOrderPanel
  }
};
</script>

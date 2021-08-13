<template>
  <v-card flat color="grey darken-3">
    <v-card-text>
      <!-- HEADER -->
      <p class="text-left">
        <v-chip color="primary" outlined dark>{{ wo.status }}</v-chip>
      </p>

      <div class="display-1 text--primary">
        {{ wo.internal_code }}
      </div>

      <div>{{ wo.customer_name }}</div>

      <v-menu v-if="!wo.finished_at" :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" text dark v-on="on"
            ><v-icon left>mdi-cogs</v-icon>
            Editar
          </v-btn>
        </template>
        <v-list light>
          <v-list-item
            ><UpdateWorkOrderStatus :internalCode="wo.internal_code" :id="wo.id"
          /></v-list-item>

          <v-list-item
            ><UpdateWorkOrderInCharge
              :internalCode="wo.internal_code"
              :id="wo.id"
          /></v-list-item>
        </v-list>
      </v-menu>

      <FinishWorkOrder
        :internalCode="wo.internal_code"
        :id="wo.id"
        v-if="!wo.finished_at"
      />
    </v-card-text>

    <v-card-text>
      <v-alert dense type="info">
        {{ wo.work_requested }}
      </v-alert>

      <WorkOrderInfoList
        :userInCharge="userInCharge"
        :work_type="wo.work_type"
        :created_at="wo.created_at"
        :finished_at="wo.finished_at"
        :manufacturer="wo.manufacturer"
        :hardware_model="wo.hardware_model"
        :hardware_type="wo.hardware_type"
        :serial_number="wo.serial_number"
      />
      <div class="grey--text ml-8">
        Informações adicionais
      </div>
      <p class="ml-8">
        {{ wo.additional_informations }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import dayjs from "dayjs";
import UpdateWorkOrderStatus from "./UpdateWorkOrderStatus.vue";
import UpdateWorkOrderInCharge from "./UpdateWorkOrderInCharge.vue";
import FinishWorkOrder from "./FinishWorkOrder.vue";
import WorkOrderInfoList from "./WorkOrderInfoList.vue";
export default {
  props: {
    wo: Object,
    userInCharge: Object
  },

  components: {
    UpdateWorkOrderStatus,
    UpdateWorkOrderInCharge,
    FinishWorkOrder,
    WorkOrderInfoList
  },

  filters: {
    date(value) {
      return dayjs(value).format("DD/MM/YYYY");
    }
  }
};
</script>

<template>
  <v-container>
    <v-card>
      <v-card-text>
        <div>{{ wo.customer_name }}</div>
        <!-- Needs change it to client name on de repository -->
        <p class="display-1 text--primary">
          {{ wo.internal_code }}
        </p>
        <v-chip color="blue" dark>{{ wo.status }}</v-chip>
        <v-row>
          <v-col>
            <p>
              <b>Encarregado: </b>
              <span v-if="!wo.in_charge">Não possui um encarregado</span>
              <span v-else class="blue--text">{{ wo.work_requested }}</span>
            </p>

            <p><b>Data de abertura:</b> {{ wo.created_at | date }}</p>

            <p v-if="wo.finished_at">
              <b>Data de finalização:</b> {{ wo.finished_at | date }}
            </p>

            <p><b>Serviço Solicitado:</b> {{ wo.work_requested }}</p>

            <p>
              <b>Informações Adicionais:</b> {{ wo.additional_informations }}
            </p>

            <p><b>Tipo de Serviço:</b> {{ wo.work_type }}</p>
          </v-col>

          <v-col>
            <p><b>Tipo de Hardware:</b> {{ wo.hardware_type }}</p>
            <p><b>Fabricante:</b> {{ wo.hardware_type }}</p>
            <p><b>Modelo:</b> {{ wo.hardware_model }}</p>
            <p><b>Número de Série:</b> {{ wo.hardware_type }}</p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <FinishWorkOrder
          :internalCode="wo.internal_code"
          :id="wo.id"
          v-if="!wo.finished_at"
        />
        <UpdateWorkOrderStatus
          :internalCode="wo.internal_code"
          :id="wo.id"
          v-if="!wo.finished_at"
        />
        <UpdateWorkOrderInCharge
          :internalCode="wo.internal_code"
          :id="wo.id"
          v-if="!wo.finished_at"
        />
      </v-card-actions>
    </v-card>

    <v-row align="center" justify="center">
      <v-card v-if="wo.finished_at" width="400" class="ma-4">
        <v-card-text>
          <v-chip color="blue" outlined>{{ wo.status }}</v-chip>
          <p class="grey--text">Finalizado em {{ wo.finished_at | date }}</p>
          <p class="text-center">{{ wo.work_performed }}</p>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import dayjs from "dayjs";
import UpdateWorkOrderStatus from "@/components/UpdateWorkOrderStatus.vue";
import UpdateWorkOrderInCharge from "@/components/UpdateWorkOrderInCharge.vue";
import FinishWorkOrder from "@/components/FinishWorkOrder.vue";
export default {
  data: () => ({
    wo: {}
  }),
  components: {
    UpdateWorkOrderStatus,
    UpdateWorkOrderInCharge,
    FinishWorkOrder
  },

  methods: {
    getWorkOrder() {
      let internalCode = this.$route.params.internal_code;
      this.$http(`/work-orders/find?internal_code=${internalCode}`)
        .then(res => (this.wo = res.data))
        .catch(err => alert(err));
    }
  },
  mounted() {
    this.getWorkOrder();
  },
  filters: {
    date(value) {
      return dayjs(value).format("DD/MM/YYYY");
    }
  }
};
</script>

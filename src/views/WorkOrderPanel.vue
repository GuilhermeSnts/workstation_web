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
        <v-btn
          color="blue"
          text
          v-if="!wo.finished_at"
          @click="finishDialog = !finishDialog"
          >finalizar</v-btn
        >
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

    <v-dialog v-model="finishDialog" width="500" scrollable>
      <v-card>
        <v-card-title>Finalizar {{ wo.internal_code }} </v-card-title>
        <v-card-text>
          <v-form v-model="finishForm" ref="form" lazy-validation>
            <v-textarea
              :rules="[v => !!v || 'Item is required']"
              outlined
              dense
              label="Conclusão"
              v-model="work_performed"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text @click="finishDialog = false">cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn dark color="blue" @click="validate()">concluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import dayjs from "dayjs";

export default {
  data: () => ({
    wo: {},
    finishDialog: false,
    finishForm: false,
    work_performed: ""
  }),
  methods: {
    getWorkOrder() {
      let internalCode = this.$route.params.internal_code;
      this.$http(`/work-orders/find?internal_code=${internalCode}`)
        .then(res => (this.wo = res.data))
        .catch(err => alert(err));
    },
    sendFinish() {
      this.$http
        .put(`/work-order/finish/${this.wo.id}`, {
          work_performed: this.work_performed
        })
        .then(() => {
          this.getWorkOrder();
          this.finishDialog = false;
        })
        .catch(error => this.showSnackbar(error.message.data));
    },
    showSnackbar(message) {
      alert(message);
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.sendFinish();
      } else {
        this.snackbar = true;
        this.snackbarText = "Existem campos obrigatórios não preenchidos";
      }
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

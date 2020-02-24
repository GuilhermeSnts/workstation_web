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
          >finalizar
        </v-btn>
        <v-btn
          color="blue"
          text
          v-if="!wo.finished_at"
          @click="changeStatusDialog = !changeStatusDialog"
          >trocar status
        </v-btn>
        <v-btn
          color="blue"
          text
          v-if="!wo.finished_at"
          @click="changeInChargeDialog = !changeInChargeDialog"
          >trocar encarregado
        </v-btn>
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

    <!-- Necessário jogar esses dialogs em componentes isolados para limpeza do código -->

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

    <!-- Change Status Dialog -->

    <v-dialog v-model="changeStatusDialog" width="300" scrollable>
      <v-card>
        <v-card-title>Alterar Status {{ wo.internal_code }} </v-card-title>
        <v-card-text>
          <p>
            O status será atualizado e uma mensagem será gravada na linha do
            tempo desta Ordem de serviço indicando o usuário que a alterou,
            data, hora e qual status estava antes da sua alteração.
          </p>
          <v-select
            label="Status"
            :items="statusList"
            item-text="status"
            item-value="id"
            v-model="statusToChange"
          ></v-select>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text @click="changeStatusDialog = false">cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn dark color="blue" @click="changeStatus()">concluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Change in Charge,  -->

    <v-dialog v-model="changeInChargeDialog" width="300" scrollable>
      <v-card>
        <v-card-title>Alterar encarregado {{ wo.internal_code }} </v-card-title>
        <v-card-text>
          <p>
            O Encarregado será atualizado e uma mensagem será gravada na linha
            do tempo desta Ordem de serviço indicando o usuário que a alterou,
            data, hora e quem era encarregado antes da sua alteração.
          </p>
          <v-select
            label="Encarregado"
            :items="userList"
            item-text="username"
            item-value="id"
            v-model="newUserInCharge"
          ></v-select>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text @click="changeInChargeDialog = false">cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn dark color="blue" @click="changeInCharge()">concluir</v-btn>
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
    changeStatusDialog: false,
    changeInChargeDialog: false,
    finishForm: false,
    work_performed: "",
    statusList: [],
    statusToChange: "",
    userList: [],
    newUserInCharge: ""
  }),
  methods: {
    getStatusList() {
      this.$http(`/work-order-status`)
        .then(res => {
          let validOptions = res.data.filter(i => !i.type);
          this.statusList = validOptions;
        })
        .catch(err => alert(err));
    },
    getWorkOrder() {
      let internalCode = this.$route.params.internal_code;
      this.$http(`/work-orders/find?internal_code=${internalCode}`)
        .then(res => (this.wo = res.data))
        .catch(err => alert(err));
    },
    getUsers() {
      this.$http("/users")
        .then(res => {
          this.userList = res.data;
        })
        .catch(() => {
          this.snackbar = true;
          this.snackbarText = "Houve um erro ao obter a lista de usuários";
        });
    },
    changeStatus() {
      this.$http
        .put(`/work-order/status/${this.wo.id}`, {
          status_id: this.statusToChange
        })
        .then(() => {
          this.getWorkOrder();
          this.changeStatusDialog = false;
          this.showSnackbar("Status foi atualizado");
        })
        .catch(error => this.showSnackbar(error.message.data));
    },

    changeInCharge() {
      this.$http
        .put(`/work-order/${this.wo.id}`, {
          in_charge: this.newUserInCharge
        })
        .then(() => {
          this.getWorkOrder();
          this.changeInChargeDialog = false;
          this.showSnackbar("O encarregado foi substituído");
        })
        .catch(error => this.showSnackbar(error.message.data));
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
    this.getStatusList();
    this.getUsers();
  },
  filters: {
    date(value) {
      return dayjs(value).format("DD/MM/YYYY");
    }
  }
};
</script>

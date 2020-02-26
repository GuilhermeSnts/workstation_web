<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="12" md="4">
      <v-card>
        <v-card-text>
          <!-- HEADER -->
          <p class="text-right">
            <v-chip color="blue" outlined small dark>{{ wo.status }}</v-chip>
          </p>

          <div class="display-1 text--primary">
            {{ wo.internal_code }}
          </div>

          <div>{{ wo.customer_name }}</div>

          <v-menu>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" text dark v-on="on" small
                ><v-icon left>mdi-cogs</v-icon>
                Editar
              </v-btn>
            </template>
            <v-list light>
              <v-list-item
                ><UpdateWorkOrderStatus
                  :internalCode="wo.internal_code"
                  :id="wo.id"
                  v-if="!wo.finished_at"
              /></v-list-item>

              <v-list-item
                ><UpdateWorkOrderInCharge
                  :internalCode="wo.internal_code"
                  :id="wo.id"
                  v-if="!wo.finished_at"
              /></v-list-item>
            </v-list>
          </v-menu>
          <!-- Needs change it to client name on de repository -->

          <v-sheet class="ma-2" outlined>
            <p class="text-center">{{ wo.work_requested }}</p>

            <p class="grey--text text-center">
              {{ wo.additional_informations }}
            </p>
          </v-sheet>

          <v-list dense>
            <v-list-item>
              <v-list-item-content class="grey--text"
                >Encarregado:</v-list-item-content
              >
              <v-list-item-content class="align-end">
                {{ userInCharge.username }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="grey--text"
                >Tipo de Serviço:</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                wo.work_type
              }}</v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="grey--text"
                >Data de criação:</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                wo.created_at | date
              }}</v-list-item-content>
            </v-list-item>

            <v-list-item v-if="wo.finished_at">
              <v-list-item-content class="grey--text"
                >Data de Finalização:</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                wo.finished_at | date
              }}</v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-content class="grey--text"
                >Tipo de Hardware:</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                wo.hardware_type
              }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="grey--text"
                >Fabricante:</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                wo.manufacturer
              }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="grey--text"
                >Modelo:</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                wo.hardware_model
              }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="grey--text"
                >Número de Série:</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                wo.hardware_type
              }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <FinishWorkOrder
            :internalCode="wo.internal_code"
            :id="wo.id"
            v-if="!wo.finished_at"
          />
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="12" sm="12" md="8">
      <v-timeline align-top dense clipped>
        <v-timeline-item fill-dot v-if="wo.finished_at">
          <template v-slot:icon><v-icon>mdi-flag-checkered</v-icon></template>
          <div class="caption font-weight-light">
            {{ wo.finished_at | date }}
          </div>

          <strong>Finalizado</strong>
          <div class="caption">{{ wo.work_performed }}</div>
        </v-timeline-item>

        <v-timeline-item fill-dot v-if="!wo.finished_at" color="orange">
          <template v-slot:icon><v-icon>mdi-edit</v-icon></template>

          <v-card>
            <v-card-text>
              <div class="caption font-weight-light">
                {{ new Date() | date }}
              </div>
              <v-textarea label="Atualizar" solo light></v-textarea
            ></v-card-text>
            <v-card-actions> <v-btn text>gravar</v-btn></v-card-actions>
          </v-card>
        </v-timeline-item>

        <v-timeline-item small fill-dot>
          <div class="caption font-weight-light">
            {{ new Date() | date }}
          </div>

          <strong>teste</strong>
          <div class="caption">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-col>
  </v-row>
</template>

<script>
import dayjs from "dayjs";
import UpdateWorkOrderStatus from "@/components/UpdateWorkOrderStatus.vue";
import UpdateWorkOrderInCharge from "@/components/UpdateWorkOrderInCharge.vue";
import FinishWorkOrder from "@/components/FinishWorkOrder.vue";
export default {
  data: () => ({
    wo: {},
    userInCharge: {}
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
  },
  filters: {
    date(value) {
      return dayjs(value).format("DD/MM/YYYY");
    }
  }
};
</script>

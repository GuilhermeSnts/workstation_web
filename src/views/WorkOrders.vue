<template>
  <v-row align="center" justify="center" class="ma-4">
    <v-col cols="12" sm="12" lg="12">
      <v-card>
        <v-card-title>
          Ordens de Serviço
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="workOrders"
            hide-default-footer=""
            v-model="selectedWorkOrder"
            height="300"
            @click="alert('qasdsa')"
          >
            <template v-slot:item.created_at="{ item }">
              <v-chip>{{ item.created_at | date }}</v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn icon :to="'work-orders/' + item.internal_code"
                ><v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </template>
          </v-data-table>
          <v-pagination
            v-model="page"
            :length="totalPages"
            total-visible="5"
          ></v-pagination>
        </v-card-text>
        <v-card-actions>
          <create-work-order @update="getWorkOrders" />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import dayjs from "dayjs";
import CreateWorkOrder from "@/components/CreateWorkOrder.vue";
export default {
  data: () => ({
    headers: [
      {
        text: "Código Interno",
        align: "left",
        sortable: false,
        value: "internal_code"
      },
      { text: "Cliente", value: "customer_name" },
      { text: "Data de Abertura", value: "created_at" },
      { text: "Tipo de Hardware", value: "hardware_type" },
      { text: "Status", value: "status" },
      { text: "Ações", value: "actions" }
    ],
    workOrders: [],
    totalItens: 0,
    page: 1,
    selectedWorkOrder: []
  }),

  components: {
    CreateWorkOrder
  },

  computed: {
    wo() {
      let wo = this.selectedWorkOrder;
      if (wo.length) {
        return wo[0];
      } else {
        return {};
      }
    },
    totalPages() {
      return Math.floor(this.totalItens / 5);
    }
  },

  methods: {
    getWorkOrders() {
      this.$http(`/work-orders?page=${this.page}`).then(res => {
        this.workOrders = res.data.work_orders;
        this.totalItens = res.data.count;
      });
    }
  },
  watch: {
    page() {
      this.getWorkOrders();
    }
  },
  mounted() {
    this.getWorkOrders();
  },
  filters: {
    date(value) {
      return dayjs(value).format("DD/MM/YYYY");
    }
  }
};
</script>

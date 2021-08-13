<template>
  <v-row>
    <v-col cols="12">
      <h1 class="mb-4">Ordens de serviço</h1>
      <v-card elevation="12">
        <v-toolbar color="secondary">
          <CreateWorkOrder @update="getWorkOrders()" />

          <v-spacer />

          <v-text-field
            dense
            light
            prepend-inner-icon="mdi-magnify"
            solo
            class="mt-6"
            placeholder="Código da OS"
            v-model="search"
            v-mask="'SQ##-####'"
            @keyup.enter="viewWorkOrder(search)"
          />
          <v-btn @click="viewWorkOrder(search)" icon>
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="workOrders"
            :items-per-page="options.itemsPerPage"
            :loading="loading"
            :options.sync="options"
            dense
            :server-items-length="totalItens"
            disable-sort
          >
            <template v-slot:item.internal_code="{ item }">
              <v-chip color="secondary" dark label small>
                {{ item.internal_code }}
              </v-chip>
            </template>

            <template v-slot:item.status="{ item }">
              <v-chip color="primary" dark label small>
                {{ item.status }}
              </v-chip>
            </template>

            <template v-slot:item.view="{ item }">
              <v-btn
                color="primary"
                icon
                @click="viewWorkOrder(item.internal_code)"
              >
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import CreateWorkOrder from "../components/CreateWorkOrder.vue";

export default {
  name: "WorkOrderList",
  data: () => ({
    workOrders: [],
    totalItens: 0,
    page: 1,
    search: "",
    loading: false,
    options: {},
    headers: [
      { text: "Código", align: "start", value: "internal_code" },
      { text: "Cliente", align: "start", value: "customer_name" },
      { text: "Equipamento", align: "start", value: "hardware_type" },
      { text: "Status", align: "start", value: "status" },
      { text: "Acesso", align: "start", value: "view" }
    ]
  }),
  components: {
    CreateWorkOrder
  },
  watch: {
    options: {
      handler() {
        this.getWorkOrders();
      },
      deep: true
    }
  },
  mounted() {
    this.getWorkOrders();
  },
  methods: {
    viewWorkOrder(internal_code) {
      if (internal_code) {
        this.$router.push(`/work-order/${internal_code}`);
      } else {
        this.$notify({
          message: "Código da OS em branco.",
          type: "danger"
        });
      }
    },
    createWorkOrder() {
      this.$router.push(`/work-order`);
    },
    getWorkOrders() {
      this.loading = true;
      this.isFiltered = false;
      this.$http(
        `/work-orders?page=${this.options.page}&perPage=${this.options.itemsPerPage}`
      )
        .then(res => {
          this.workOrders = res.data.work_orders;
          this.totalItens = parseInt(res.data.count);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

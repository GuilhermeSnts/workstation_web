<template>
  <v-content>
    <v-card color="blue">
      <v-card-text>
        <div>Ordens de serviço:</div>
        <p class="display-3">
          {{ totalItens }}
        </p>
      </v-card-text>

      <v-card-actions>
        <create-work-order @update="getWorkOrders" />
      </v-card-actions>
    </v-card>

    <v-card color="grey darken-3" class="mt-4">
      <v-card-text>
        <v-row>
          <v-col cols="12" xs="10" sm="10" md="4">
            <v-text-field
              label="Pesquisar por código interno"
              v-model="search"
              clearable
              solo
              light
              prepend-inner-icon="mdi-magnify"
              dense
            ></v-text-field>
          </v-col>

          <v-col cols="12" xs="2" sm="2" md="2">
            <WorkOrderFilter />
          </v-col>
        </v-row>

        <v-list nav color="grey darken-3">
          <v-list-item
            v-for="(item, index) in workOrders"
            :key="index"
            :to="'/work-orders/' + item.internal_code"
          >
            <v-list-item-avatar>
              <v-icon class="blue white--text" v-text="'mdi-folder'" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="item.internal_code" />
              <v-list-item-subtitle v-text="item.customer_name" />
              <v-list-item-subtitle v-text="item.hardware_type" />
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text>
                {{ item.created_at | date }}
              </v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-content>
</template>

<script>
import dayjs from "dayjs";
import CreateWorkOrder from "@/components/workOrders/CreateWorkOrder.vue";
import WorkOrderFilter from "@/components/workOrders/WorkOrderFilter.vue";
export default {
  data: () => ({
    workOrders: [],
    totalItens: 0,
    page: 1,
    selectedWorkOrder: [],
    search: ""
  }),

  components: {
    CreateWorkOrder,
    WorkOrderFilter
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
    },
    getWorkOrderBySeachTerm() {
      this.$http(`/work-orders/search/${this.search}`).then(res => {
        this.workOrders = res.data;
      });
    }
  },
  watch: {
    page() {
      this.getWorkOrders();
    },
    search(value) {
      if (value) {
        this.getWorkOrderBySeachTerm();
      } else {
        this.getWorkOrders();
      }
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

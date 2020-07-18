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
          <v-expansion-panels light>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <span><v-icon>mdi-filter</v-icon> Filtros</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-col cols="12" xs="12" sm="12" md="5">
                  <v-text-field
                    label="Pesquisar por código interno"
                    v-model="search"
                    clearable
                    outlined
                    light
                    prepend-inner-icon="mdi-magnify"
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="5">
                  <WorkOrderFilter @filter="setFilteredWorkOrders" />
                </v-col>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
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
        <v-pagination
          v-show="!isFiltered"
          v-model="page"
          color="blue"
          class="ma-4"
          :length="totalPages"
          total-visible="6"
        ></v-pagination>
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
    search: "",
    isFiltered: false
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
      this.isFiltered = false;
      this.$http(`/work-orders?page=${this.page}`).then(res => {
        this.workOrders = res.data.work_orders;
        this.totalItens = res.data.count;
      });
    },

    getWorkOrderBySeachTerm() {
      this.isFiltered = true;
      this.$http(`/work-orders/search/${this.search}`).then(res => {
        this.workOrders = res.data;
      });
    },

    setFilteredWorkOrders(workOrders) {
      this.isFiltered = true;
      this.workOrders = workOrders;
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

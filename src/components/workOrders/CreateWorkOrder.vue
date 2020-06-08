<template>
  <v-dialog v-model="dialog" width="800" scrollable>
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">
        <v-icon left>mdi-file-plus</v-icon>
        Nova Ordem de Serviço
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        Cadastrar nova ordem de serviço
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-4"
        ><v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="wo.work_requested"
            label="Defeito Reclamado"
            dense
            outlined
            required
          ></v-text-field>
          <v-row class="ma-n2">
            <v-col cols="12" md="6" sm="12">
              <v-autocomplete
                v-model="wo.previous_id"
                :loading="previousCodeLoading"
                label="OS anterior"
                item-text="internal_code"
                :search-input.sync="internalCodeToSearch"
                :items="workOrdersSearchList"
                hide-no-data
                hide-selected
                item-value="id"
                dense
                outlined
                required
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-select
                v-model="wo.work_type"
                label="Tipo de Serviço *"
                :items="['contrato', 'orçamento', 'garantia']"
                dense
                outlined
                required
              ></v-select>
            </v-col>
          </v-row>

          <v-autocomplete
            v-model="wo.customer_id"
            :loading="customerLoading"
            label="Cliente"
            item-text="name"
            :search-input.sync="customerToSearch"
            :items="customersSearchList"
            hide-no-data
            hide-selected
            item-value="id"
            dense
            outlined
            required
          ></v-autocomplete>
          <v-select
            v-model="wo.department_id"
            label="Departamento responsável"
            :items="departmentList"
            :rules="[v => !!v || 'Item is required']"
            item-text="department_name"
            item-value="id"
            dense
            outlined
            required
          ></v-select>
          <v-select
            v-model="wo.in_charge"
            label="Encarregado"
            :items="userList"
            :rules="[v => !!v || 'Item is required']"
            item-text="username"
            item-value="id"
            dense
            outlined
            required
          ></v-select>
          <v-divider class="mt-2 mb-6"></v-divider>
          <v-select
            v-model="wo.hardware_type"
            label="Tipo de hardware"
            :items="[
              'Desktop',
              'Notebook',
              'Impressora',
              'Modem',
              'Roteador',
              'CFTV',
              'Ultrabook',
              'Netbook',
              'Servidor',
              'Scanner'
            ]"
            :rules="[v => !!v || 'Item is required']"
            dense
            outlined
            required
          ></v-select>
          <v-row align="center" justify="center" class="ma-n2">
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="wo.manufacturer"
                label="Fabricante"
                dense
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="wo.hardware_model"
                label="Modelo"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="wo.serial_number"
                label="Número de Série"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-textarea
            v-model.lazy="wo.additional_informations"
            label="Informações Adicionais"
            outlined
            dense
          ></v-textarea>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn @click="dialog = false" text>cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="blue" @click="validate">
          <v-icon left>mdi-content-save</v-icon> Cadastrar</v-btn
        >
      </v-card-actions>

      <v-snackbar v-model="snackbar" :timeout="3000">
        {{ snackbarText }}
        <v-btn color="blue" text @click="snackbar = false">
          Fechar
        </v-btn>
      </v-snackbar>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    wo: {
      work_requested: "",
      previous_id: "",
      work_type: "",
      customer_id: "",
      in_charge: "",
      hardware_type: "",
      manufacturer: "",
      hardware_model: "",
      serial_number: "",
      additional_informations: "",
      department_id: ""
    },
    //settings for work orders
    internalCodeToSearch: "",
    workOrdersSearchList: [],
    previousCodeLoading: false,
    //settings for client
    customerToSearch: "",
    customersSearchList: [],
    customerLoading: false,
    //settings for form
    dialog: false,
    valid: true,
    snackbar: false,
    snackbarText: "",
    previous_id: "",
    departmentList: [],
    userList: []
  }),
  computed: {},
  watch: {
    internalCodeToSearch() {
      if (!this.internalCodeToSearch) {
        this.workOrdersSearchList.length = 0;
        this.wo.previous_id = "";
      }
      if (this.workOrdersSearchList.length > 0) return;
      if (this.previousCodeLoading) return;
      this.previousCodeLoading = true;
      this.searchWorkOrders();
    },

    customerToSearch() {
      if (!this.customerToSearch) {
        this.customersSearchList.length = 0;
        this.wo.customer_id = "";
      }
      if (this.customersSearchList.length > 0) return;
      if (this.customerLoading) return;
      this.customerLoading = true;
      this.searchCustomer();
    }
  },

  methods: {
    searchCustomer() {
      this.customerLoading = true;
      this.$http(`/customers/search/${this.customerToSearch}`)
        .then(res => (this.customersSearchList = res.data))
        .catch(err => alert(err))
        .finally((this.customerLoading = false));
    },

    searchWorkOrders() {
      this.previousCodeLoading = true;
      this.$http(`/work-orders/search/${this.internalCodeToSearch}`)
        .then(res => (this.workOrdersSearchList = res.data))
        .catch(err => alert(err))
        .finally((this.previousCodeLoading = false));
    },

    validate() {
      if (this.$refs.form.validate()) {
        this.createWorkOrder();
      } else {
        this.snackbar = true;
        this.snackbarText = "Existem campos obrigatórios não preenchidos";
      }
    },

    getDepartments() {
      this.$http("/departments")
        .then(res => {
          this.departmentList = res.data;
        })
        .catch(() => {
          this.snackbar = true;
          this.snackbarText = "Houve um erro ao obter a lista de departamentos";
        });
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

    createWorkOrder() {
      this.$http
        .post("/work-orders", this.wo)
        .then(() => {
          this.snackbar = true;
          this.snackbarText = "Ordem de serviço cadastrada com sucesso!";
          this.dialog = false;
          this.$emit("update");
        })
        .catch(() => {
          this.snackbar = true;
          this.snackbarText = "Houve um erro ao cadastrar a ordem de Serviço";
        });
    }
  },
  mounted() {
    this.getDepartments();
    this.getUsers();
  }
};
</script>

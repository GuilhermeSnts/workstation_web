<template>
  <v-dialog
    :max-width="!isMobile ? '350px' : '500px'"
    :fullscreen="isMobile"
    v-model="dialog"
    :transition="!isMobile ? 'scale-transition' : 'dialog-bottom-transition'"
  >
    <template v-slot:activator="{ on }">
      <v-btn text small v-on="on">
        <v-icon left>
          mdi-plus
        </v-icon>
        Criar um novo chamado
      </v-btn>
    </template>

    <v-card class="grey darken-3">
      <v-toolbar v-if="isMobile" color="blue darken-2">
        <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
        <v-toolbar-title>
          <v-icon left>mdi-ticket</v-icon>
          Novo Chamado
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="createTicket()" icon>
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-title v-if="!isMobile">
        <v-icon left>mdi-ticket</v-icon>
        Novo Chamado
      </v-card-title>

      <v-card-text class="pa-8">
        <v-form v-model="form" ref="form">
          <v-text-field
            label="Título"
            v-model="title"
            :rules="[v => !!v || 'Campo Obrigatório']"
            solo
            light
          ></v-text-field>
          <v-textarea
            label="Descrição"
            rows="5"
            v-model="description"
            :rules="[v => !!v || 'Campo Obrigatório']"
            solo
            light
          ></v-textarea>
          <v-autocomplete
            v-model="customer_id"
            :loading="customerLoading"
            label="Cliente"
            item-text="name"
            :rules="[v => !!v || 'Campo Obrigatório']"
            :search-input.sync="customerToSearch"
            :items="customersSearchList"
            hide-no-data
            hide-selected
            item-value="id"
            dense
            solo
            required
            light
          ></v-autocomplete>
          <v-select
            :disabled="!customer_id"
            v-model="department_id"
            label="Departamento"
            :items="departmentList"
            :rules="[v => !!v || 'Campo Obrigatório']"
            item-text="department_name"
            item-value="department_id"
            solo
            required
            light
          ></v-select>
        </v-form>
      </v-card-text>

      <v-card-actions v-if="!isMobile">
        <v-btn text @click="dialog = false">
          fechar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="blue" @click="createTicket()">
          <v-icon left>mdi-content-save</v-icon>
          Criar chamado
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    title: "",
    description: "",
    customer_id: "",
    departmentList: [],
    department_id: "",
    customerToSearch: "",
    customersSearchList: [],
    customerLoading: false,
    form: ""
  }),
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    }
  },
  methods: {
    createTicket() {
      if (this.$refs.form.validate()) {
        this.$http
          .post("/tickets", {
            title: this.title,
            description: this.description,
            customer_id: this.customer_id,
            department_id: this.department_id
          })
          .then(() => {
            this.dialog = false;
            this.$emit("update");
          })
          .catch(error => {
            alert(error);
          });
      } else {
        alert("erro");
      }
    },

    searchCustomer() {
      this.customerLoading = true;
      this.$http(`/customers/search/${this.customerToSearch}`)
        .then(res => (this.customersSearchList = res.data))
        .catch(err => alert(err))
        .finally((this.customerLoading = false));
    },

    getDepartments() {
      this.$http(`/departments/customer/${this.customer_id}`)
        .then(res => {
          this.departmentList = res.data;
        })
        .catch(() => {
          this.snackbar = true;
          this.snackbarText = "Houve um erro ao obter a lista de departamentos";
        });
    }
  },
  watch: {
    customer_id() {
      this.getDepartments();
    },

    customerToSearch() {
      if (!this.customerToSearch) {
        this.customersSearchList.length = 0;
        this.customer_id = "";
      }
      if (this.customersSearchList.length > 0) return;
      if (this.customerLoading) return;
      this.customerLoading = true;
      this.searchCustomer();
    }
  },
  mounted() {
    this.getDepartments();
    this.getDepartments();
  }
};
</script>

<style></style>

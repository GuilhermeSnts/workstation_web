<template>
  <v-dialog v-model="dialog" width="400" scrollable>
    <template v-slot:activator="{ on }">
      <v-btn small class="blue" v-on="on">
        <v-icon left>mdi-briefcase-plus-outline</v-icon>
        Adicionar Departamento
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        Adicionar Departamento
      </v-card-title>
      <v-divider />
      <v-card-text class="pa-4">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-autocomplete
            v-model="department_id"
            :items="departmentsList"
            item-text="department_name"
            item-value="id"
            label="Departamento"
            outlined
          />
        </v-form>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-btn @click="dialog = false" text>cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="blue" @click="addDepartment">
          <v-icon left>mdi-content-save</v-icon> Salvar</v-btn
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
  props: ["id"],

  data: () => ({
    department_id: "",
    customerDepartments: [],
    departmentsList: [],
    dialog: false,
    valid: true,
    snackbar: "",
    snackbarText: ""
  }),

  methods: {
    getDepartments() {
      this.$http
        .get(`/departments`)
        .then(res => {
          let filtered = res.data.filter(
            d => !this.customerDepartments.some(a => a.department_id == d.id)
          );
          this.departmentsList = filtered;
        })
        .catch(() => {
          this.snackbar = true;
          this.snackbarText = "Houve um erro ao salvar o cliente";
        });
    },

    getCustomerDepartments() {
      this.$http(`/departments/customer/${this.$route.params.id}`)
        .then(res => (this.customerDepartments = res.data))
        .catch(err => alert(err))
        .finally((this.customerLoading = false));
    },

    addDepartment() {
      this.$http
        .post(`/departments/customer/${this.id}`, {
          department_id: this.department_id
        })
        .then(() => {
          this.snackbar = true;
          this.snackbarText = "Departamento adicionado com sucesso!";
          this.dialog = false;
          this.$emit("update");
        })
        .catch(() => {
          this.snackbar = true;
          this.snackbarText = "Houve um erro ao adicionar o departamento";
        });
    }
  },
  mounted() {
    this.getCustomerDepartments();
    this.getDepartments();
  }
};
</script>

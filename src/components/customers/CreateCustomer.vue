<template>
  <v-dialog
    v-model="dialog"
    width="400"
    scrollable
    :fullscreen="$vuetify.breakpoint.xsOnly"
    transition="slide-x-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">
        <v-icon left>mdi-account-plus</v-icon>
        Novo Cliente
      </v-btn>
    </template>

    <v-card>
      <v-toolbar dark color="primary" v-if="$vuetify.breakpoint.xsOnly">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>Cadastrar um novo cliente</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card-title v-if="$vuetify.breakpoint.smAndUp">
        Cadastrar um novo cliente
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-4"
        ><v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="customer.name"
            label="Nome do Cliente *"
            :rules="rules.name"
            dense
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="customer.email"
            :rules="rules.email"
            label="e-mail *"
            dense
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="customer.phone"
            label="Telefone *"
            dense
            outlined
            required
          ></v-text-field>
          <v-checkbox
            label="Empresa"
            v-model="customer.is_company"
          ></v-checkbox>

          <v-text-field
            v-model="customer.document_number"
            :label="document_type"
            :rules="[v => !!v || 'Item is required']"
            dense
            outlined
          ></v-text-field>
          <p class="title">Endereço</p>
          <v-row align="center" justify="center" class="ma-n2">
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="customer.postal_code"
                label="CEP"
                @blur="searchPostalCode(customer.postal_code)"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="customer.address_number"
                label="Número"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                outlined
                dense
                v-model="customer.complement"
                label="Complemento"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="ma-n2">
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="customer.street"
                label="Rua"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="customer.neighborhood"
                label="Bairro"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
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
    customer: {
      name: "",
      email: "",
      phone: "",
      is_company: false,
      document_number: "",
      postal_code: "",
      address_number: "",
      complement: "",
      street: "",
      neighborhood: ""
    },
    dialog: false,
    valid: true,
    snackbar: false,
    snackbarText: "",
    rules: {
      name: [
        v => !!v || "Campo obrigatório",
        v => v.length >= 10 || "Nome deve ter pelo menos 10 caracteres",
        v => v.length <= 255 || "Nome deve ter no máximo 255 caracteres"
      ],
      email: [
        v => !!v || "Campo obrigatório",
        v => /.+@.+/.test(v) || "Insira um email válido",
        v => v.length <= 45 || "Email deve ter no máximo 45 caracteres"
      ]
    }
  }),
  computed: {
    document_type() {
      if (this.customer.is_company) {
        return "cnpj";
      } else {
        return "cpf";
      }
    }
  },

  methods: {
    searchPostalCode(postal_code) {
      fetch(`http://www.viacep.com.br/ws/${postal_code}/json/`).then(
        ({ data }) => {
          this.customer.neighborhood = data.bairro;
          this.customer.street = data.rua;
        }
      );
    },

    validate() {
      if (this.$refs.form.validate()) {
        this.createCustomer();
      } else {
        this.snackbar = true;
        this.snackbarText = "Existem campos obrigatórios não preenchidos";
      }
    },
    createCustomer() {
      this.$http
        .post("/customers", this.customer)
        .then(() => {
          this.snackbar = true;
          this.snackbarText = "Cliente cadastrado com sucesso!";
          this.dialog = false;
          this.$emit("update");
        })
        .catch(() => {
          this.snackbar = true;
          this.snackbarText = "Houve um erro ao cadastrar o cliente";
        });
    }
  }
};
</script>

<template>
  <v-dialog width="500" scrollable v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn color="orange darken-1" v-on="on"
        ><v-icon left>mdi-plus</v-icon> Adicionar Nota
      </v-btn>
    </template>

    <v-card class="grey darken-3">
      <v-card-title>Adicionar Nota</v-card-title>
      <v-card-text>
        <div class="caption font-weight-light">
          {{ new Date() | date }}
        </div>
        <v-text-field label="Titulo" solo light v-model="title"></v-text-field>
        <v-textarea label="Nota" solo light v-model="note"></v-textarea
      ></v-card-text>
      <v-card-actions>
        <v-btn text @click="dialog = false">fechar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="createNote()"
          >gravar</v-btn
        ></v-card-actions
      >
    </v-card>
  </v-dialog>
</template>

<script>
import dayjs from "dayjs";

export default {
  data: () => ({
    dialog: false,
    note: "",
    title: ""
  }),

  methods: {
    createNote() {
      this.$http
        .post(`/work-order-note`, {
          note: this.note,
          title: this.title,
          work_order_id: this.id,
          icon: "",
          color: "blue",
          type: "note"
        })
        .then(() => {
          this.$emit("created");
          this.note = "";
          this.title = "";
          this.dialog = false;
        });
    }
  },

  props: {
    id: String
  },

  filters: {
    date(value) {
      return dayjs(value).format("DD/MM/YYYY");
    }
  }
};
</script>

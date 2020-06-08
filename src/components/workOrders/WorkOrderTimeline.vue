<template>
  <v-card flat color="grey darken-3">
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
        <template v-slot:icon><v-icon>mdi-note-plus-outline</v-icon></template>

        <v-card>
          <v-card-text>
            <div class="caption font-weight-light">
              {{ new Date() | date }}
            </div>
            <v-text-field
              label="Titulo"
              solo
              light
              v-model="note.title"
            ></v-text-field>
            <v-textarea label="Nota" solo light v-model="note.note"></v-textarea
          ></v-card-text>
          <v-card-actions>
            <v-btn text @click="createNote()">gravar</v-btn></v-card-actions
          >
        </v-card>
      </v-timeline-item>

      <v-timeline-item
        small
        fill-dot
        v-for="(item, index) in WorkOrderNotes"
        :key="index"
      >
        <div class="caption font-weight-light">
          às
          <span class="blue--text">{{ item.created_at | date }}</span>
          por
          <span class="blue--text">{{ item.author_name }}</span>
        </div>

        <strong>{{ item.title }}</strong>
        <div class="caption">
          {{ item.note }}
        </div>
      </v-timeline-item>

      <v-timeline-item fill-dot>
        <template v-slot:icon><v-icon>mdi-star</v-icon></template>
        <div class="caption font-weight-light">
          {{ wo.created_at | date }}
        </div>
        <strong>Criado</strong>
        <div class="caption">OS criada por {{ wo.creator }}</div>
      </v-timeline-item>
    </v-timeline>
  </v-card>
</template>

<script>
export default {
  props: {
    wo: Object,
    WorkOrderNotes: Array
  },
  data: () => ({
    note: {
      note: "",
      title: ""
    }
  }),

  methods: {
    createNote() {
      this.$http
        .post(`/work-order-note`, {
          note: this.note.note,
          title: this.note.title,
          work_order_id: this.wo.id,
          icon: "",
          color: "blue",
          type: "note"
        })
        .then(() => {
          this.getWorkOrderNotes();
          this.note.note = "";
          this.note.title = "";
        });
    }
  }
};
</script>

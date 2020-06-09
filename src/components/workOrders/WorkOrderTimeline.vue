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
        <CreateWorkOrderNote @created="getNotes()" :id="wo.id" />
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
import dayjs from "dayjs";
import CreateWorkOrderNote from "@/components/workOrders/CreateWorkOrderNote.vue";

export default {
  props: {
    wo: Object
  },

  data: () => ({
    WorkOrderNotes: []
  }),

  components: {
    CreateWorkOrderNote
  },

  methods: {
    getNotes() {
      this.$http(`/work-order-notes/${this.wo.id}`)
        .then(res => {
          this.WorkOrderNotes = res.data;
        })
        .catch(err => alert(err));
    }
  },

  mounted() {
    this.getNotes();
  },

  filters: {
    date(value) {
      return dayjs(value).format("DD/MM/YYYY");
    }
  }
};
</script>

<template>
  <v-list nav color="grey darken-3">
    <v-list-item v-for="(item, index) in list" :key="index">
      <v-list-item-avatar>
        <v-icon color="primary" v-text="item.icon" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="item.title" />
        <v-list-item-subtitle class="grey--text" v-text="item.subtitle" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "WorkOrderInfoList",

  props: {
    userInCharge: Object,
    work_type: String,
    created_at: String,
    finished_at: String,
    manufacturer: String,
    hardware_model: String,
    hardware_type: String,
    serial_number: String
  },

  computed: {
    list() {
      let list = [
        {
          title: this.userInCharge.username,
          subtitle: "Encarregado",
          icon: "mdi-account-tie"
        },
        {
          title: this.work_type,
          subtitle: "Tipo de Serviço",
          icon: "mdi-wrench"
        },
        {
          title: this.formatDate(this.created_at),
          subtitle: "Data de criação",
          icon: "mdi-star"
        },
        {
          title: this.formatDate(this.finished_at),
          subtitle: "Data de finalização",
          icon: "mdi-flag-checkred"
        },
        {
          title: this.manufacturer,
          subtitle: "Fabricante",
          icon: "mdi-factory"
        },
        { title: this.hardware_model, subtitle: "Modelo", icon: "mdi-stamper" },
        {
          title: this.hardware_type,
          subtitle: "Tipo de hardware",
          icon: "mdi-desktop-classic"
        },
        {
          title: this.serial_number,
          subtitle: "Número de série",
          icon: "mdi-barcode"
        }
      ];
      return list.filter(i => i.title != false);
    }
  },

  methods: {
    formatDate(value) {
      if (dayjs(value).isValid()) {
        return dayjs(value).format("DD/MM/YYYY");
      } else {
        return false;
      }
    }
  }
};
</script>

<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      Trocar informações do perfil
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form>
        <v-text-field
          label="Nome"
          v-model="name"
          outlined
          dense
          append-icon="mdi-account"
        ></v-text-field>
        <v-text-field
          label="E-mail"
          v-model="email"
          outlined
          dense
          append-icon="mdi-email"
        ></v-text-field>
        <v-btn color="primary">Alterar dados</v-btn>
      </v-form>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "UpdateProfilePanel",
  data: () => ({
    name: "",
    email: ""
  })
};
</script>

<template>
  <v-expansion-panel>
    <v-expansion-panel-header> Trocar minha senha </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form>
        <v-text-field
          label="Senha"
          v-model="password"
          outlined
          dense
          append-icon="mdi-lock"
        ></v-text-field>
        <v-text-field
          label="Confirmação de senha"
          v-model="passwordConfirmation"
          outlined
          dense
          append-icon="mdi-lock"
        ></v-text-field>
        <v-btn color="primary">Alterar senha</v-btn>
      </v-form>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "ChangePasswordPanel",
  data: () => ({
    password: "",
    passwordConfirmation: ""
  })
};
</script>

<style></style>

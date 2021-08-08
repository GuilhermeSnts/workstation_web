<template>
  <v-row>
    <v-col cols="12">
      <h1 class="mb-4">Usuários</h1>
      <v-card>
        <v-toolbar color="secondary">
          <v-btn outlined>
            <v-icon left>mdi-account-plus</v-icon>
            Adicionar novo usuário
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">
                  Nome
                </th>
                <th class="text-left">
                  Sobrenome
                </th>
                <th class="text-left">
                  E-mail
                </th>
                <th class="text-left">
                  login
                </th>
                <th>
                  Status
                </th>
                <th>
                  Administrador
                </th>
                <th>
                  Gerente
                </th>
                <th>
                  Editar
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in users" :key="item.id">
                <td>{{ item.first_name }}</td>
                <td>{{ item.last_name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.username }}</td>
                <td class="text-center">
                  <v-chip v-if="item.is_active" label small color="success"
                    >ativo</v-chip
                  >
                  <v-chip v-else label small color="error">inativo</v-chip>
                </td>
                <td class="text-center">
                  <v-icon v-if="item.is_admin" color="secondary"
                    >mdi-circle</v-icon
                  >
                  <v-icon v-else>mdi-circle-small</v-icon>
                </td>

                <td class="text-center">
                  <v-icon v-if="item.is_manager" color="secondary"
                    >mdi-circle</v-icon
                  >
                  <v-icon v-else>mdi-circle-small</v-icon>
                </td>
                <td>
                  <v-btn @click="editUser(item.id)" icon>
                    <v-icon>mdi-account-edit</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "UserList",
  data: () => ({
    users: []
  }),
  mounted() {
    this.getUsers();
  },
  methods: {
    editUser(id) {
      this.$router.push(`/user/${id}`);
    },
    getUsers() {
      this.loading = true;
      this.$http
        .get(`/users`)
        .then(({ data }) => {
          this.users = data;
        })
        .catch(() => {
          this.$notify({
            message: "Ocorreu um erro ao tentar buscar a lista de usuários.",
            type: "danger"
          });
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>

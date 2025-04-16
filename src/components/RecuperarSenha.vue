<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow p-4">
          <h3 class="text-center mb-4">Recuperar Senha</h3>

          <form @submit.prevent="enviarEmail">
            <div class="form-group">
              <label for="email">Informe seu email:</label>
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="Digite seu email"
                required
              />
            </div>


            <div class="form-group">
              <label for="email">Informe a nova senha:</label>
              <input
                v-model="senha"
                type="senha"
                class="form-control"
                placeholder="Digite a nova senha"
                required
              />
            </div>

            <div class="form-group">
              <label for="email">Confirme a nova senha:</label>
              <input
                v-model="confirmSenha"
                type="senha"
                class="form-control"
                placeholder="Confirme a nova senha"
                required
              />
            </div>


            <div class="text-center mt-3">

                <button class="btn btn-primary" type="submit">
                  <i class="fa fa-envelope"></i> Recuperar Senha
                </button>

                <router-link to="/login" class="btn btn-link d-block mt-2">
                  <i class="fa fa-arrow-left"></i> Voltar para o Login
                </router-link>
              </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      email: "",
      senha: "",
      confirmSenha: "",
    };
  },
  methods: {
    async enviarEmail() {
      if (!this.email) {
        Swal.fire({
          icon: "warning",
          title: "Campo obrigatório",
          text: "Por favor, informe o email.",
        });
        return;
      }

      try {
        // Buscar usuário pelo e-mail
        const response = await axios.get(
          `https://localhost:7131/api/v1/login/buscar-email?email=${this.email}`
        );
        const usuario = response.data;

        // Resetar senha
        await axios.put(
          `https://localhost:7131/api/v1/login/resetar-senha/${usuario.id}`,
          {
            novaSenha: this.senha
          }
        );

        Swal.fire({
          icon: "success",
          title: "Senha redefinida!",
          text: "Uma nova senha foi gerada com sucesso.",
        });

        this.email = "";
        this.$router.push("/login");

      } catch (error) {
        const msg = error.response?.data || "Erro ao buscar o usuário";
        Swal.fire({
          icon: "error",
          title: "Email não encontrado",
          text: typeof msg === "string" ? msg : msg.title || msg.errors?.Usuario?.[0] || "O email informado não está cadastrado.",
        });
      }
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  border: none;
}
</style>

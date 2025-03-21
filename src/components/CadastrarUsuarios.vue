<template>
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h2 class="text-center mb-4">Cadastrar Usuário</h2>
    
          <!-- Formulário -->
          <form @submit.prevent="cadastrarUsuario">
            <div class="form-group mb-4">
              <label for="nome">Nome</label>
              <input type="text" v-model="usuario.nome" class="form-control" required placeholder="Digite o nome">
            </div>
    
            <div class="form-group mb-4">
              <label for="email">Email</label>
              <input type="email" v-model="usuario.email" class="form-control" required placeholder="Digite o email">
            </div>
    
            <div class="form-group mb-4">
              <label for="cpf">CPF</label>
              <input type="text" v-model="usuario.cpf" class="form-control" required placeholder="Digite o CPF">
            </div>
    
            <div class="form-group mb-4">
              <label for="status">Status</label>
              <select v-model="usuario.status" class="form-control" required>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
        
            <div class="text-center">
              <button type="submit" class="btn btn-success">
                <i class="fa fa-save"></i> Salvar
              </button>
              
            </div>
          </form>
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
      usuario: {
        nome: "",
        email: "",
        cpf: "",
        status: "ativo",
        foto: ""
      }
    };
  },
  methods: {
    async cadastrarUsuario() {
      try {
        const response = await axios.post("https://localhost:7263/api/v1/usuarios/cadastrar", this.usuario);
        console.log(response);
        Swal.fire({
          title: "Sucesso!",
          text: "Usuário cadastrado com sucesso.",
          icon: "success",
          confirmButtonText: "OK"
        });
  
        this.$router.push("/home/usuarios"); 
      } catch (error) {
        Swal.fire({
          title: "Erro!",
          text: "Falha ao cadastrar usuário.",
          icon: "error",
          confirmButtonText: "OK"
        });
        console.error(error);
      }
    },
  }
  };
  </script>
  
  <style scoped>
   .container {
  max-width: 800px;
  }
  
  h2 {
  font-weight: bold;
  }
  </style>
  
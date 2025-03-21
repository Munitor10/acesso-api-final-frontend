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

            <div class="from-group mb-4">
            <label for="foto">Foto de perfil</label>
            <div ref="dropzone" class="dropzone"></div>
            </div>

            <div v-if class="text-center mt-3">
            <h5>Preview</h5>
            <img : src="previewImagem"
            class="img-Preview img-fluid">
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
  import Dropzone from "dropzone";
  import "dropzone/dist/dropzone.css";
  
  export default {
  data() {
    return {
      usuario: {
        nome: "",
        email: "",
        cpf: "",
        status: "ativo",
        foto: ""
      },
      dropzoneInstance: null,
      previewImagem: null
    };
  },
  mounted(){
    this.StartDropzone();
  },
  methods: {
    StartDropzone(){
      const self = this;
      this.dropzoneInstance = new Dropzone(this.&refs.dropzone, {
        url: "/",
        autoProccessQueue: false,
        acceptedFiles: "image/*",
        maxFiles: 1,
        addRemoveLink: true,
        dicDefaultMessage: "Arraste uma imagem aqui",
        init: functon(){
          this.on("addedfile", functon (file){
            //console.log("adicionou");
            //console.log(file);
            self.converterImagemBase64(file)
            .then((base64) =>{
              self.previewImagem = base64;
              self.usuario.foto = base64.split(",")[1];
            })
            .catch((error) => console.error("erro,base 64:",error));
            });
            this.on("remover", functon(){
                    this.previewImagem = null;
                    this.usuario.foto = null;
            });
        }
      });
    },
    async converterImagemBase64(file){
      return new Promise((resolve, reject() => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) reject(error);

      }))
    },
    async cadastrarUsuario() {
      try {
        const response = await axios.post("https://localhost:7131/api/v1/usuarios/cadastrar", this.usuario);
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

  .dropzone{
    border:2px dashed #007bff;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    backgrund-color: #f8f9fa;
  }
  .img-Preview{
    max-width: 100%;
    max-height: 300px;
    border-radius: 10px;
    border: 3px solid #ddd;
  }
  </style>
  
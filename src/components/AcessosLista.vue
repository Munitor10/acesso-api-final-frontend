<template>
    <div class="container mt-4">
        <h2 class="mb-3">Gerenciamento de Acessos</h2>

        <!-- Botão para criar novo -->
        <div class="mb-3">
            <router-link to="acesso/registrar" class="btn btn-success">
                <i class="fa fa-plus"></i> Adicionar novo Acesso
            </router-link>
        </div>

        <div v-if="carregando" class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Carregando...</span>
            </div>
        </div>

        <div v-if="erro" class="alert alert-danger text-center">
            <i class="fa fa-ban"></i> {{erro}}
        </div>

        <div v-if="!carregando && acessos.length === 0 && !erro" class="alert alert-warning text-center">
            <i class="fa fa-exclamation-circle"></i> Nenhum acesso cadastrado!
        </div>

        <!-- Tabela de listagem -->
        <div class="table-responsive">
            <table v-if="!carregando && acessos.length > 0" class="table table-striped table-hover">
                <thead class="thead-dark">
                    <tr>
                        <th>Id:</th>
                        <th>Nome:</th>
                        <th>Tempo:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="acesso in acessos" :key="acesso.id">
                        <td>{{ acesso.id }}</td>
                        <td>{{ acesso.nomeUsuario }}</td>
                        <td>{{ acesso.dataHoraAcesso }}</td>
                     
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Backdrop do Modal -->
        <div v-if="usuarioSelecionado" class="modal-backdrop fade show"></div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            acessos: [],
            carregando: false,
            erro: null
        };
    },
    mounted() {
        this.carregarUsuarios();
    },
    methods: {
        async carregarUsuarios() {
            this.carregando = true;

            try {
                const response = await axios.get("https://localhost:7131/api/v1/usuarios/listar-todos");

                setTimeout(() => {
                    this.acessos = response.data;
                    this.carregando = false;
                }, 2000);
            } catch (error) {
                this.erro = "Ocorreu um erro ao listar os Acessos!";
                console.log(error);
                this.carregando = false;
            }
        }
    }
}
</script>
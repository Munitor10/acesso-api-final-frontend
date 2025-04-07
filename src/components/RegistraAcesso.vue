<template>
    <div class="container mt-4">
        <h2 class="mb-3">Registrar Acesso</h2>

        <!-- Exibir Erro -->
        <div v-if="erro" class="alert alert-danger text-center">
            <i class="fa fa-ban"></i> {{ erro }}
        </div>

        <!-- Exibir Sucesso -->
        <div v-if="sucesso" class="alert alert-success text-center">
            <i class="fa fa-check-circle"></i> {{ sucesso }}
        </div>

        <form @submit.prevent="salvarAcesso">
            <!-- Seleção de Usuário -->
            <div class="form-group">
                <label for="usuario">Usuário:</label>
                <select v-model="acesso.usuarioId" id="usuario" class="form-control" required>
                    <option value="" disabled>Selecione um usuário</option>
                    <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
                        {{usuario.nome || usuario.id   }} <!-- Garante que sempre exibe algo -->
                    </option>
                </select>
            </div>

            <!-- Data e Hora do Acesso -->
            <div class="form-group">
                <label for="dataHora">Data e Hora do Acesso:</label>
                <input type="datetime-local" id="dataHora" class="form-control" v-model="acesso.dataHoraAcesso">
            </div>

            <!-- Botões -->
            <div class="mt-3">
                <button type="submit" class="btn btn-success">
                    <i class="fa fa-save"></i> Salvar
                </button>
                <router-link to="/acessos" class="btn btn-secondary ml-2">
                    <i class="fa fa-arrow-left"></i> Voltar
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            usuarios: [],
            acesso: {
                usuarioId: "",
                dataHoraAcesso: new Date().toISOString().slice(0, 16)
            },
            erro: null,
            sucesso: null
        };
    },
    mounted() {
        this.carregarUsuarios();
    },
    methods: {
        async carregarUsuarios() {
            try {
                const response = await axios.get("https://localhost:7131/api/v1/usuarios/listar-todos"); // Corrigido para obter usuários
                this.usuarios = response.data || []; // Garante que é um array
            } catch (error) {
                this.erro = "Erro ao carregar usuários!";
                console.error(error);
            }
        },

        async salvarAcesso() {
            try {
                const response = await axios.post("https://localhost:7131/api/v1/acessos/registrar", this.acesso);

                if (response && response.status === 201) { // Verifica se o status é 201 (Created)
                    this.sucesso = "Acesso registrado com sucesso!";
                    this.erro = null;

                    // Resetar o formulário
                    this.acesso.usuarioId = "";
                    this.acesso.dataHoraAcesso = new Date().toISOString().slice(0, 16);
                } else {
                    this.erro = "Erro ao registrar acesso!";
                }
            } catch (error) {
                this.erro = error.response?.data?.message || "Erro ao registrar acesso!";
                this.sucesso = null;
                console.error(error);
            }
        }
    }
};
</script>

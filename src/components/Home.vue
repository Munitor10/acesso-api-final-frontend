<template>  
    <div>
    <!--nav-->
    <nav class="navbar navibar-expand-lg navbar-dark bg-primary">
    <div class="container">
    <a class="navbar-brand" href="#">
    <img src="@/assets/logo.png" class="logo"> Sistema IA
    </a>

    <div class="collapse navibar-collapse">
    <ul class"navbar-nav">
    <li class="nav-item dropdown">
    <router-link class="nav-link dropdown-toggle" to="/home/usuarios">
    Usuarios
    </router-link>
    </li>
    </ul>
    </div>
    </div>
   
    <ur class="navibar-nav ml-auto">
    <li class="nav-item">
    <a class="nav-link text-white" href="#" @click="deslogar">
    <i class="fa fa"></i>Sair
    </a>
    </li>
    </ur>
    </nav>

    <div class="container mt-4 text-center">
    <h2>Bem vindo, {{ nomeUsuarioLogado }}</h2>
    </div>
   
    <div class="container">
    <router-view></router-view>
    </div>

    </div>
</template>

<script>   
export default {
    data(){
        return{
            nomeUsuarioLogado:''
        };
    },
    mounted(){
        const usuarioLogado = localStorage.getItem('dados-usuario-logado');
        if (usuarioLogado){
            this.nomeUsuarioLogado = JSON.parse(usuarioLogado).nome;
        }
    },
    methods: {
        deslogar()
        {
            localStorage.removeItem('dados-usuario-logado');
            this.$router.push('/login');
        }
    }
}
</script>

<style>
.logo{
    width: 30px;
    margin-right: 10px;
}
</style>
import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login.vue';
import Home from '@/components/Home.vue';
import Usuarios from '@/components/Usuarios.vue'


Vue.use(Router);

const router =  new Router({
    mode: "history",
    routes: [
        { path: "/login", component: Login },
        { 
            path: "/home", 
            component: Home,
            children: [
                { path: "usuarios", component: Usuarios },
            ],
            meta: { requiresAuth: true}
        },
    ]
});

//intercepta a navegaçao se nao logado
/*router.beforeEach((to, from, next ) => {
    const usuarioLogado = localStorage.getItem('dados-usuario-logado');

    if(to.matched.some(record => record.meta.requiresAuth) && !usuarioLogado)
    {
        next('/login');
    }
    next();
});*/

export default router;
import {RouteRecordRaw, createRouter, createWebHistory} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path:'/',
        alias:'/pacientes',
        name: 'pacientes',
        component: () => import('@/components/ListaPacientes.vue'),
    },
    {
        path:'/pacientes/agregar',
        name: 'pacientes-new',
        component: () => import('@/components/AltasPacientes.vue'),
    },
    {
        path:'/pacientes/:id',
        name: 'pacientes-modificar',
        component: () => import('@/components/MEPacientes.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
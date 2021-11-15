import {RouteRecordRaw, createRouter, createWebHistory} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path:"/",
        name:'principal',
        component:() => import('@/components/Principal.vue')
    },
    {
        path:'/listapacientes',
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
    {
        path:'/protocolo/agregar',
        name: 'protocolo-new',
        component: () => import ('@/components/AltaProtocolo1.vue'),
    },
    {
        path:'/protocolo/agregar-visita/:id',
        name: 'protocolo-new-visita',
        component: () => import ('@/components/AltaProtocolo2.vue'),
    },
    {
        path:'/listaprotocolos',
        name: 'protocolos',
        component: () => import('@/components/ListaProtocolo.vue'),
    },
    {
        path: '/protocolos/:id',
        name: 'protocolo-modificar',
        component: () => import('@/components/MEProtocolo.vue') //Aun no esta el archivo

    }
   
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
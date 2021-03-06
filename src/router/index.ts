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
        component: () => import('@/components/ModificacionesPacientes.vue'),
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
        component: () => import('@/components/MEProtocolo.vue')

    },
    {
        path: '/citas/agregar',
        name: 'citas-new',
        component: () => import('@/components/AltaCitas.vue')
    },
    {
        path:'/calendario',
        name: 'calendario',
        component: () => import ('@/components/Calendario.vue')
    },
    {
        path:'/registro',
        name: 'registro',
        component: () => import ('@/components/Registro.vue')
    },
    {
        path:'/listaR',
        name:'listaRe',
        component: () => import('@/components/ListaRegistro.vue')
    },
    {
        path:'/login',
        name:'login',
        component: () => import('@/components/login.vue')
    },
    {
        path:'/OlvideCon',
        name:'OlvideCon',
        component: () => import('@/components/OlvideCon.vue')
    },
    {
        path:'/Configuracion',
        name:'Configuracion',
        component: () => import('@/components/Configuracion.vue')
    },
    {
        path:'/AsignarPa',
        name:'Asignar',
        component: () => import('@/components/AsignarPA.vue')
    },
    {
        path:'/AsignarP',
        name:'AsignarP',
        component: () => import('@/components/AsignarPro.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Principal</router-link>
            <button class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/listapacientes">Pacientes</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/listaprotocolos">Protocolos</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/pacientes/agregar">Nuevo Paciente</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/protocolo/agregar">Nuevo Protocolo</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/citas/agregar">Nueva Visita</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/calendario">Calendario</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/registro">Registro</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/listaR">ListaR</router-link>
                    </li>
                    <li class="nav-item" >
                        <router-link class="nav-link" to="/login">login</router-link>
                    </li>
                    <li class="nav-item" >
                        <router-link class="nav-link" to="/OlvideCon">Olvide</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
    import { defineComponent } from '@vue/runtime-core'

    export default defineComponent({
        name:"Navbar"
    })
</script>

<style scoped>
    
</style>
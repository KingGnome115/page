<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <router-link class="navbar-brand" to="/">Principal</router-link>
            <button class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
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
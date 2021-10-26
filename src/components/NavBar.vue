<template>
    <nav>
        <ul>
            <li>
                <router-link to="/">Pacientes</router-link>
            </li>
            <li>
                <router-link to="/pacientes/agregar">Nuevo Paciente</router-link>
            </li>
        </ul>
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
<template>
    <nav>
        <ul>
            <li>
                <router-link to="/">Tareas</router-link>
            </li>
            <li>
                <router-link to="/tasks/new">Nueva Tarea</router-link>
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

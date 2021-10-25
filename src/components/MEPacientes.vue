<template lang="">
    <div>
        <h1>Detalles de tareas</h1>
        <form @submit.prevent="handleUpdate()">
            <input type="text" v-model="pacienteActual.titulo">
            <textarea rows="3" v-model="pacienteActual.descripcion"></textarea>
            <button type="">Actualizar</button>
        </form>
        <button @click="handleDelete()">Eliminar</button>
    </div>
</template>
<script lang="ts">
    import { Paciente } from "@/interfaces/Paciente";
    import { consultarPaciente, modificarPaciente, eliminarPaciente } from "@/services/PacienteServices";
    import { defineComponent } from "@vue/runtime-core";    
    export default defineComponent({
        data(){
            return{
                pacienteActual: {} as Paciente
            }
        },
        methods:{
            async buscarPaciente(id: string){
               const res = await consultarPaciente(id)
               this.pacienteActual = res.data
            },
            async handleUpdate(){
                modificarPaciente(this.pacienteActual._id,this.pacienteActual)
                this.$router.push("/")
            },
            async handleDelete(){
                eliminarPaciente(this.pacienteActual._id)
                this.$router.push("/")
            }
        },
        mounted(){
            if(typeof this.$route.params.id === 'string'){
                this.buscarPaciente(this.$route.params.id)
            }
        }
    })
</script>
<style scoped>
    
</style>
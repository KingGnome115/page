<template lang="">
    <div>
        <h1>Lista de pacientes</h1>
        <ul>
            <li v-for="(paciente, index) in pacientes" :key="index" @click="this.$router.push(`/pacientes/${paciente._id}`)">
                {{paciente.nomPila}} {{paciente.primApellido}} {{paciente.segApellido}} <hr>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { consultarPacientes } from '@/services/PacienteServices'
    import {defineComponent} from 'vue'
    import { Paciente } from '../interfaces/Paciente';

    export default defineComponent({
        data(){
            return{
                pacientes: [] as Paciente[]
            }
        },
        methods:{
            async cargarPacientes(){
                const res = await consultarPacientes()
                this.pacientes = res.data
                console.log(res.data)
            }
        },
        mounted(){
            this.cargarPacientes()
        }
    })

</script>

<style scoped>
    ul{
        display: inline-block;
    }
</style>
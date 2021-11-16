<template lang="">
    <div class="Contenido">
        <h1 class="ti">Lista de pacientes</h1>
        
        <div class="field has-addons is-pulled-right">
            <div class="control">
                <input v-model="nombre" type="text" class="form-control valid barraBusqueda" placeholder="Nombre del paciente" v-on:keyup.enter="buscarData">
            </div>
            <div class="control">
                <button class="btn btn-primary"  v-on:click="buscarData">Buscar</button>
            </div>
        </div>

        <ul class="lista" >
            <li v-for="(paciente, index) in pacientes" :key="index" @click="this.$router.push(`/pacientes/${paciente._id}`)">
                {{paciente.nomPila}} {{paciente.primApellido}} {{paciente.segApellido}} <hr>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { consultarPacientes } from '../services/PacienteServices'
    import {defineComponent} from 'vue'
    import { Paciente } from '../interfaces/Paciente';
    export default defineComponent({
        data(){
            return{
                pacientes: [] as Paciente[],
                nombre: ''
            }
        },
        methods:{
            async cargarPacientes(){
                const res = await consultarPacientes()
                this.pacientes = res.data
            },
            async buscarData(){
                this.pacientes.forEach(paciente => {
                    let nombreCompleto = paciente.nomPila + ' ' + paciente.primApellido + ' ' + paciente.segApellido
                    if(nombreCompleto.indexOf(this.nombre) > -1){
                        this.$router.push(`/pacientes/${paciente._id}`)
                    }
                })
            }
        },
        mounted(){
            this.cargarPacientes()
        },
    })

</script>

<style scoped>
    ul{
        display: inline-block;
    }
    .Contenido{
        padding: 10px;
    }

    .ti{
        font-size: 30px;
        font-weight: bold;
        text-align: center;
    }
    
    .barraBusqueda{
        float: right;
        width: 30%;
        margin: .5em 2em 0 0;
    }

    button{
        float: right;
        width: 15%;
        margin: 3.5em 2em;
    }

</style>
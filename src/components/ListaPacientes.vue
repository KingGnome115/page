<template lang="">
    <div class="container">
        <div class="row mt-3">
            <header class="row text-align" >
                <h2>Lista de Pacientes</h2>
            </header>

            <form class="row">
                
                <div class="col-12 col-md-8 mt-3 mb-3">
                    <input v-model="nombre" type="text" autocomplete="off" v-bind="state" @input="filterStates" class="form-control valid barraBusqueda" placeholder="Nombre del paciente" v-on:keyup.enter="buscarData">
                </div>

                <div class="col-12 col-md-4 mt-3 mb-3">
                    <button class="btn btn-primary"  v-on:click="buscarData">Buscar</button>
                </div>

                <div>
                    <ul class="list">
                        <li v-for="(filt, index) in filteredStates" :key="index" @click="buscaData(filt)"> {{filt}} </li>
                    </ul>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
    import { consultarPacientes} from '../services/PacienteServices'
    import {defineComponent} from 'vue'
    import { Paciente } from '../interfaces/Paciente';
    export default defineComponent({
        data(){
            return{
                pacientes: [] as Paciente[],
                nombre: '',
                state: '',
                states: [] as string[],
                filteredStates: [] as string[],
            }
        },
        methods:{
            async cargarPacientes(){
                const res = await consultarPacientes()
                this.pacientes = res.data
                this.pacientes.forEach(paciente => {
                    this.states.push(paciente.nomPila+"-"+paciente.primApellido+"-"+paciente.segApellido)
                })
            },
            async buscarData(){
                this.pacientes.forEach(paciente => {
                    let nombreCompleto = paciente.nomPila + ' ' + paciente.primApellido + ' ' + paciente.segApellido
                    if(nombreCompleto.indexOf(this.nombre) > -1){
                        this.$router.push(`/pacientes/${paciente._id}`)
                    }
                })
            },
            async buscaData(nom: string){
                this.pacientes.forEach(paciente => {
                    let nombr = nom.split("-")
                    if(nombr[0] === paciente.nomPila && nombr[1] === paciente.primApellido && nombr[2] === paciente.segApellido){
                        this.$router.push(`/pacientes/${paciente._id}`)
                    }
                })
            },
            filterStates(){
                
                if(this.nombre.length === 0){
                    this.filteredStates = []
                }else{
                    this.filteredStates = this.states.filter(state => {
                        return state.toLowerCase().startsWith(this.nombre.toLowerCase())
                    })
                }
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
        margin-left: 4%;
    }

    li{
        padding: 5px;
    }
    
    header {
        background: var(--fondo-contenido);
    }

    body {
        background: #F8F8FF;
        padding: 10px;
    }
</style>
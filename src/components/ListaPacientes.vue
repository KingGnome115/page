<template lang="">
    <div class="container">
        <div class="row mt-3">
            <header class="row text-align" >
                <h2>Lista de Pacientes</h2>
            </header>

            <form class="row">
                
                <div class="col-12 col-md-8 mt-3 mb-3">
                    <input v-model="nombre" v-on:keypress="recon" type="text" autocomplete="off" v-bind="state" @input="filterStates" class="form-control valid barraBusqueda" placeholder="Nombre del paciente" v-on:keyup.enter="buscarData">
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
    import { consultarPacienteNom } from '../services/PacienteServices'
    import { consultarPacientesRex } from '../services/PacienteServices'
    import {defineComponent} from 'vue'
    import { Paciente } from '../interfaces/Paciente';
    export default defineComponent({
        data(){
            return{
                pacientes: [] as string[],
                nombre: '',
                state: '',
                states: [] as string[],
                filteredStates: [] as string[],
                pacienteEnc: {} as Paciente
            }
        },
        methods:{
            async cargarPacientes(){
                const res = await consultarPacientesRex('a')
                if(typeof res.data !== 'undefined'){
                    this.pacientes = res.data as string[]
                }
                this.pacientes.forEach(paciente => {
                    this.states.push(paciente)
                })
            },
            async buscaData(nom: string){
                let pacienteB = '';
                this.pacientes.forEach(paciente => {
                    let nomPac = paciente.toLowerCase()
                    if(nomPac.toLowerCase() == nom.toLowerCase()){
                        pacienteB = paciente
                    }
                })
                if(pacienteB !== ''){
                    let nombre = pacienteB.split('-')
                    const protocoloE = await consultarPacienteNom(nombre[0], nombre[1], nombre[2])
                    this.pacienteEnc = protocoloE.data as Paciente
                    this.$router.push(`/pacientes/${this.pacienteEnc._id}`)
                }
            },
            filterStates(){
                if(this.nombre.length === 0){
                    this.filteredStates = []
                }else{
                    this.filteredStates = this.states.filter(state => {
                        return state.toLowerCase().includes(this.nombre.toLowerCase())
                    })
                }
            },
            async recon(){
                if(this.nombre.length !== 0){
                    const res = await consultarPacientesRex(this.nombre)
                    if(typeof res.data !== 'undefined'){
                        this.pacientes = res.data as string[]
                    }

                    this.pacientes.forEach(paciente => {
                        if(!this.states.includes(paciente)){
                            this.states.push(paciente)
                        }
                    })
                    this.filterStates()
                }
            },
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
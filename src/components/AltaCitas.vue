<template lang="">
    <div class="container">
        <div class="row mt-3">
            <header class="row text-align" >
                <h2>Lista de Protocolos</h2>
            </header>
            
            <form class="row">
                <div class="control col-12 col-md-8 mt-3 mb-3">
                    <input v-model="nombreProtocolo" type="text" autocomplete="off" v-bind="stateProtocolo" @input="filterStatesProtocolo" class="form-control valid barraBusqueda" placeholder="Nombre del protocolo" v-on:keyup.enter="buscarDataProtocolo">
                </div>

                <div class="control col-12 col-md-4 mt-3 mb-3">
                        <button class="btn btn-primary"  v-on:click="buscarDataProtocolo">Buscar</button>
                </div>

                <div>
                    <ul class="list">
                        <li v-for="(filt, index) in filteredStatesProtocolo" :key="index" @click="buscaDataPaciente(filt)"> {{filt}} </li>
                    </ul>
                </div>
            </form>
        </div>

        <div class="row mt-3">
            <header class="row text-align" >
                <h2>Agregar Paciente</h2>
            </header>

            <form class="row">
                
                <div class="col-12 col-md-8 mt-3 mb-3">
                    <input v-model="nombrePaciente" type="text" autocomplete="off" v-bind="statePaciente" @input="filterStatesPaciente" class="form-control valid barraBusqueda" placeholder="Nombre del paciente" v-on:keyup.enter="buscarDataPaciente">
                </div>

                <div class="col-12 col-md-4 mt-3 mb-3">
                    <button class="btn btn-primary"  v-on:click="buscarDataPaciente">Buscar</button>
                </div>

                <div>
                    <ul class="list">
                        <li v-for="(filt, index) in filteredStatesPaciente" :key="index" @click="buscaDataPaciente(filt)"> {{filt}} </li>
                    </ul>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import { Citas } from "../interfaces/Citas";
    import { Paciente } from "../interfaces/Paciente";
    import { Protocolo } from "../interfaces/Protocolos";
    import { consultarPacientes} from '../services/PacienteServices'
    import { consultarProtocolos } from '../services/ProtocoloServices'

   export default defineComponent({
       data(){
           return{
                cita:[] as Citas[],
                protocolo:{} as Protocolo,
                protocolos: [] as Protocolo[],
                pacientes: [] as Paciente[],
                //Para la barra de busqueda de pacientes
                nombrePaciente: '',
                statePaciente: '',
                statesPacientes: [] as string[],
                filteredStatesPaciente: [] as string[],
                //Para la barra de busqueda de protocolos
                nombreProtocolo: '',
                stateProtocolo: '',
                statesProtocolos: [] as string[],
                filteredStatesProtocolo: [] as string[],
           }
        },
        methods:{
            async cargarPacientes(){
                const res = await consultarPacientes()
                this.pacientes = res.data
                this.pacientes.forEach(paciente => {
                    this.statesPacientes.push(paciente.nomPila+"-"+paciente.primApellido+"-"+paciente.segApellido)
                })
                const resP = await consultarProtocolos()
                this.protocolos = resP.data
                this.protocolos.forEach(element => {
                    this.statesProtocolos.push(element.nomProtocolo)
                });
            },
            async buscarDataPaciente(){
                this.pacientes.forEach(paciente => {
                    let nombreCompleto = paciente.nomPila + ' ' + paciente.primApellido + ' ' + paciente.segApellido
                    if(nombreCompleto.indexOf(this.nombrePaciente) > -1){
                        let idPaciente = paciente._id
                        console.log(idPaciente)
                    }
                    
                })
            },
            async buscaDataPaciente(nom: string){
                this.pacientes.forEach(paciente => {
                    let nombr = nom.split("-")
                    if(nombr[0] === paciente.nomPila && nombr[1] === paciente.primApellido && nombr[2] === paciente.segApellido){
                        let idPaciente = paciente._id
                        console.log(idPaciente)
                    }
                })
            },
            filterStatesPaciente(){
                this.filteredStatesPaciente = this.statesPacientes.filter(statePaciente => {
                    return statePaciente.toLowerCase().startsWith(this.nombrePaciente.toLowerCase())
                })
            },
            async buscarDataProtocolo(){
                this.protocolos.forEach(protocolo => {
                    let nomPro = protocolo.nomProtocolo.toLowerCase()
                    if(nomPro.indexOf(this.nombreProtocolo.toLowerCase()) > -1){
                        let idProtocolo = protocolo._id
                        console.log(idProtocolo)
                    }
                })
            },
            async buscaDataProtocolo(nom : string){
                this.protocolos.forEach(protocolo => {
                    let nomPro = protocolo.nomProtocolo.toLowerCase()
                    if(nomPro.indexOf(nom.toLowerCase()) > -1){
                        let idProtocolo = protocolo._id
                        console.log(idProtocolo)
                    }
                })
            },
            filterStatesProtocolo(){
                this.filteredStatesProtocolo = this.statesProtocolos.filter(state => {
                    return state.toLowerCase().startsWith(this.nombreProtocolo.toLowerCase())
                })
            }
        },
        mounted(){
            this.cargarPacientes()
        }
   })


</script>

<style scoped>
   header {
        background: var(--fondo-contenido);
    }

    body {
        background: #F8F8FF;
        padding: .5em;
    }  
</style>
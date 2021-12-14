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
                        <li v-for="(filt, index) in filteredStatesProtocolo" :key="index" @click="buscaDataProtocolo(filt)"> {{filt}} </li>
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

        <header class="row text-center" >
            <h2>Modificacion de Protocolo</h2>
            <p>Protocolo {{protocolo.nomProtocolo}} </p>
        </header>

        <form class="row" action="Protocolo.html" method="get" id="contenedor">
            <div class="col-12 mb-3">
                <label for="nomProtocolo" class="form-label"> Nombre del protocolo: </label>
                <input type="text" class="form-control valid" id="nomProtocolo" placeholder="Ej. Protocolo 1" required v-model="protocolo.nomProtocolo" disabled>
            </div>

            <div class="col-12 col-md-4 mb-3">
                <label for="numeroProtocolo" class="form-label"> Numero de protocolo: </label>
                <input type="text" class="form-control valid" id="numeroProtocolo" placeholder="Ej. 10 " required v-model.number="protocolo.numeroProtocolo" disabled> <!--Si el tipo es texto solo se toma-->
            </div>

            <div class="col-12 col-md-4 mb-3">
                <label for="numeroVisitas" class="form-label"> Numero de visitas totales: </label>
                <input type="number" class="form-control valid" id="numeroVisitas" size="10" placeholder="Ej. 15 visitas" min="1"  required v-model.number="protocolo.numeroVisitas" disabled> <!--Si el tipo es numero al v-model se le explica esto-->
            </div>

            <div class="col-12 col-md-4 mb-3">
                <label for="muestrario" class="form-label"> Color de identificacion de protocolo: </label> 
                <input type="color" class="form-control form-control-color valid" id="muestrario" required v-model="protocolo.color" disabled> <!--El color se toma como string-->
            </div>

            <!--Tabla-->
            <div class="table-responsive">
                <table class="table table-primary table-hover table-sm table-bordered">
                    <caption>Formulario de visitas</caption>
                    <!--Encabezado-->
                    <thead>
                        <tr>
                            <td>N°:</td>
                            <td>Tipo de Nomenclatura:</td>
                            <td>Tipo de periodo:</td>
                            <td>Tamaño del periodo:</td>
                            <td>Visita cero: </td>
                            <td>Visita EOS:</td>
                            <td>Visita EOT:</td>
                        </tr>
                    </thead>

                    <!--Cuerpo de la tabla-->
                    <tbody>
                        <tr v-for="(visita, index) in protocolo.visitas" :key="index">
                            <td>
                                <label for="tipoNomenclatura" class="form-label"> {{index+1}} </label>
                            </td>

                            <td>
                                <input type="text" class="form-control valid" id="tipoNomenclatura" placeholder="Ej. V1,V2,...Vn " required v-model="visita.nomeclatura" disabled> 
                            </td>

                            <td>
                                <input type="text" class="form-control valid" id="tipoNomenclatura" placeholder="Ej. V1,V2,...Vn " required v-model="visita.tipoDePeriodo" disabled>
                            </td>

                            <td>
                                <input type="number" class="form-control valid" id="tamPeriodo" placeholder="Ej. 3 dias/semanas" required v-model="visita.tamanioPeriodo" disabled>
                            </td>

                            <td>
                                <input type="checkbox" v-model="visita.visitaCero" name='zero' disabled>
                            </td>

                            <td>
                                <input type="checkbox" v-model="visita.eotEstudio" name='eos' disabled>
                            </td>

                            <td>
                                <input type="checkbox" v-model="visita.eotTratamiento" name='eot' disabled>
                            </td>
                            <br>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>

        <form class="row">
            <!--Tabla-->
            <div class="table-responsive">
                <table class="table table-primary table-hover table-sm table-bordered">
                    <caption>Formulario de visitas</caption>
                    <!--Encabezado-->
                    <thead>
                        <tr>
                            <td>Paciente</td>
                            <td>Fecha de la visita cero</td>
                        </tr>
                    </thead>

                    <!--Cuerpo de la tabla-->
                    <tbody>
                        <tr v-for="(paciente, index) in pacientesCitas" :key="index">
                            <td>
                                <label for="NombrePaciente" class="form-label"> {{paciente.nomPila}} {{paciente.primApellido}} {{paciente.segApellido}} </label>
                            </td>

                            <td>
                                <input type="date" min="1920-01-01" max="2023-12-31" class="form-control valid" id="fechaR" required>
                                <div class="invalid-feedback">
                                    Por favor ingrese una fecha valida
                                </div>
                            </td>
                            <br>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>

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
                pacientesCitas: [] as Paciente[],

                //Arreglo para las busquedas
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
                        this.pacientesCitas.push(paciente)
                    }
                })
            },
            async buscaDataPaciente(nom: string){
                this.pacientes.forEach(paciente => {
                    let nombr = nom.split("-")
                    if(nombr[0] === paciente.nomPila && nombr[1] === paciente.primApellido && nombr[2] === paciente.segApellido){
                        this.pacientesCitas.push(paciente)
                    }
                })
            },
            filterStatesPaciente(){
                if (this.nombrePaciente.length===0) {
                    this.filteredStatesPaciente = []
                } else {
                    this.filteredStatesPaciente = this.statesPacientes.filter(statePaciente => {
                    return statePaciente.toLowerCase().startsWith(this.nombrePaciente.toLowerCase())
                    })
                }
            },
            async buscarDataProtocolo(){
                this.protocolos.forEach(protocolo => {
                    let nomPro = protocolo.nomProtocolo.toLowerCase()
                    if(nomPro.indexOf(this.nombreProtocolo.toLowerCase()) > -1){
                        this.protocolo = protocolo

                    }
                })
                console.log(this.protocolo)
            },
            async buscaDataProtocolo(nom : string){
                this.protocolos.forEach(protocolo => {
                    let nomPro = protocolo.nomProtocolo.toLowerCase()
                    if(nomPro.indexOf(nom.toLowerCase()) > -1){
                        this.protocolo = protocolo
                    }
                })
                console.log(this.protocolo)
            },
            filterStatesProtocolo(){
                if (this.nombreProtocolo.length===0) {
                    this.filteredStatesProtocolo = []
                } else {
                   this.filteredStatesProtocolo = this.statesProtocolos.filter(state => {
                    return state.toLowerCase().startsWith(this.nombreProtocolo.toLowerCase())
                    }) 
                }
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
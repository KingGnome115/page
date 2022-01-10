<template lang="">
    <div class="container">
        <div class="row">
        <div class="col-12 col-lg-6">
            <header class="row text-align" >
                <h2>Protocolos</h2>
            </header>
            
            <form>
                <div class="control col-12 mt-3 mb-3">
                    <input v-model="nombreProtocolo" v-on:keypress="reconPro" type="text" autocomplete="off" v-bind="stateProtocolo" @input="filterStatesProtocolo" class="form-control valid barraBusqueda" placeholder="Nombre del protocolo" v-on:keyup.enter="buscarDataProtocolo">
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

        <div class="col-12 col-md-6">
            <header class="row text-align" >
                <h2>Pacientes</h2>
            </header>

            <form>           
                <div class="col-12 mt-3 mb-3">
                    <input v-model="nombrePaciente" v-on:keypress="reconPa" type="text" autocomplete="off" v-bind="statePaciente" @input="filterStatesPaciente" class="form-control valid barraBusqueda" placeholder="Nombre del paciente" v-on:keyup.enter="buscarDataPaciente">
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
    </div>

    <hr>

    <div class="container">
        <header class="row text-center" >
            <h2> Protocolo</h2>
            <p>Descripcion del protocolo {{protocolo.nomProtocolo}} </p>
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

        <form class="row" @submit.prevent="guardarCitas()">
            <!--Tabla-->
            <div class="table-responsive">
                <table class="table table-primary table-hover table-sm table-bordered">
                    <caption>Lista de pacientes</caption>
                    <!--Encabezado-->
                    <thead>
                        <tr>
                            <td>Paciente</td>
                            <td>Fecha de la visita cero</td>
                            <td>Quitar</td>
                        </tr>
                    </thead>

                    <!--Cuerpo de la tabla-->
                    <tbody>
                        <tr v-for="(paciente, index) in pacientesCitas" :key="index">
                            <td>
                                <label for="NombrePaciente" class="form-label"> {{paciente.nomPila}} {{paciente.primApellido}} {{paciente.segApellido}} </label>
                            </td>

                            <td>
                                <input type="date" min="1920-01-01" max="2023-12-31" class="form-control valid" id="fechaR" required v-model="fechasZero[index]">
                                <div class="invalid-feedback">
                                    Por favor ingrese una fecha valida
                                </div>
                            </td>
                            
                            <td>
                                <button type="button" v-on:click="eliminarDato(index)" class="btn btn-danger">-</button>
                            </td>
                            <br>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="d-flex gap-2 justify-content-end mb-3">
                <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import { Citas } from "../interfaces/Citas";
    import { Paciente } from "../interfaces/Paciente";
    import { Protocolo } from '../interfaces/Protocolos';
    import { modificarPaciente, consultarPacientesRexNa, consultarPacienteNom } from '../services/PacienteServices';
    import { consultarProtocolosRex } from '../services/ProtocoloServices';
    import { consultarProtocoloNom } from '../services/ProtocoloServices';
    import { agregarCitas } from '../services/CitasServices'

    export default defineComponent({
        data(){
            return{
                fechasZero: [] as string[],
                protocolo:{} as Protocolo,
                pacientesCitas: [] as Paciente[],
                cit: {} as Citas,

                //Arreglo para las busquedas
                protocolos: [] as string[],
                pacientes: [] as string[],
                pacienteE : {} as Paciente,
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
            async cargarPacientes(){ //Carga los pacientes y los protocolos en el arreglo de pacientes y protocolos
                const res = await consultarPacientesRexNa('a')
                if(typeof res.data !== 'undefined'){
                    this.pacientes = res.data as string[]
                }
                this.pacientes.forEach(paciente => {
                    this.statesPacientes.push(paciente)
                })

                
                const resP = await consultarProtocolosRex('a')
                if (typeof resP.data !== 'undefined'){
                    this.protocolos = resP.data as string[]
                }
                this.protocolos.forEach(element => {
                    this.statesProtocolos.push(element)
                });
            },
            async buscaDataPaciente(nom: string){//Filtra los pacientes segun el nombre y lo agrega al arreglo de pacientesCitas
                let pacienteB = ''
                this.pacientes.forEach(paciente => {
                    if(paciente.toLowerCase() == nom.toLowerCase()){
                        pacienteB = paciente
                        this.nombrePaciente = ''
                        this.filterStatesPaciente()
                    }
                    console.log(paciente)
                })
                if(pacienteB !== ''){
                    let nombre = pacienteB.split('-')
                    const res = await consultarPacienteNom(nombre[0], nombre[1], nombre[2])
                    this.pacienteE = res.data as Paciente
                    if(!this.pacientesCitas.includes(this.pacienteE)){
                        this.pacientesCitas.push(this.pacienteE)
                        this.fechasZero.push('')
                        this.nombrePaciente = ''
                        this.filterStatesPaciente()
                    }
                }
            },
            filterStatesPaciente(){//Filtra los pacientes segun el nombre y lo agrega al arreglo de filteredStatesPaciente
                if (this.nombrePaciente.length === 0) {
                    this.filteredStatesPaciente = []
                } else {
                    this.filteredStatesPaciente = this.statesPacientes.filter(statePaciente => {
                        return statePaciente.toLowerCase().includes(this.nombrePaciente.toLowerCase())
                    })
                }
            },
            async reconPa(){
                if(this.nombrePaciente !== ''){
                    const res = await consultarPacientesRexNa(this.nombrePaciente)
                    if(typeof res.data !== 'undefined'){
                        this.pacientes = res.data as string[]
                    }
                    
                    this.pacientes.forEach(element => {
                        if(!this.statesPacientes.includes(element)){
                            this.statesPacientes.push(element)
                        }
                    });
                    this.filterStatesPaciente()
                }
            }
            ,
            async buscaDataProtocolo(nom : string){//Filtra los protocolos segun el nombre y lo agrega al arreglo de pacientesCitas
                let protocoloB = '';
                this.protocolos.forEach(protocolo => {
                    let nomPro = protocolo.toLowerCase()
                    if(nomPro.toLowerCase() == nom.toLowerCase()){
                        protocoloB = protocolo
                        this.nombreProtocolo = ''
                        this.filterStatesProtocolo()
                    }
                })
                if(protocoloB != ''){
                    let protocoloE = await consultarProtocoloNom(protocoloB)
                    this.protocolo = protocoloE.data as Protocolo
                }
            },
            async reconPro(){
                if(this.nombreProtocolo.length != 0){
                    const res = await consultarProtocolosRex(this.nombreProtocolo)
                    if (typeof res.data !== 'undefined'){
                        this.protocolos = res.data as string[]
                    }

                    this.protocolos.forEach(element => {
                        if(!this.statesProtocolos.includes(element)){
                            this.statesProtocolos.push(element)
                        }
                    });
                }
            }
            ,
            filterStatesProtocolo(){//Filtra los protocolos segun el nombre y lo agrega al arreglo de filteredStatesProtocolo
                if (this.nombreProtocolo.length===0) {
                    this.filteredStatesProtocolo = []
                } else {
                    this.filteredStatesProtocolo = this.statesProtocolos.filter(state => {
                    return state.toLowerCase().includes(this.nombreProtocolo.toLowerCase())
                    }) 
                }
            },
            eliminarDato(index: number){
                this.pacientesCitas.splice(index, 1)
                this.fechasZero.splice(index, 1)
            },
            async guardarCitas(){
                if (this.protocolo.nomProtocolo === '' || this.protocolo.nomProtocolo === undefined){
                    alert('Seleccione un protocolo')
                } else {
                    if(this.pacientesCitas.length === 0){
                        alert('Seleccione al menos un paciente')
                    } else {
                        for(let i = 0; i < this.pacientesCitas.length; i++){
                            this.pacientesCitas[i].asigando = true
                            let idPaciente = this.pacientesCitas[i]._id
                            let idProtocolo = this.protocolo._id
                            let visitaZero = this.fechasZero[i]
                            this.cit.idPaciente = idPaciente
                            this.cit.idProtocolo = idProtocolo
                            this.cit.visitaZero = visitaZero
                            await agregarCitas(this.cit)
                            modificarPaciente(idPaciente, this.pacientesCitas[i])
                        }
                        this.$router.push(`/Tcitas/${this.protocolo._id}`)
                    }
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
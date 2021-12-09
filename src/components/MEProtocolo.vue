import { Protocolo } from '../interfaces/Protocolos';
<template lang="">
    <div class="container"> 
        <div class="row mt-3">
            <header class="row text-center" >
                <h2>Modificacion de Protocolo</h2>
                <p>Protocolo {{protocolo.nomProtocolo}} </p>
            </header>

            <form class="row" action="Protocolo.html" method="get" id="contenedor" @submit.prevent="handleUpdate()">

                <div class="col-12 mb-3">
                    <label for="nomProtocolo" class="form-label"> Nombre del protocolo: </label>
                    <input type="text" class="form-control valid" id="nomProtocolo" placeholder="Ej. Protocolo 1" required v-model="protocolo.nomProtocolo">
                    <div class="invalid-feedback">
                        Por favor escriba un nombre de Protocolo
                    </div>
                </div>

                <div class="col-12 col-md-4 mb-3">
                    <label for="numeroProtocolo" class="form-label"> Numero de protocolo: </label>
                    <input type="text" class="form-control valid" id="numeroProtocolo" placeholder="Ej. 10 " required v-model.number="protocolo.numeroProtocolo"> <!--Si el tipo es texto solo se toma-->
                    <div class="invalid-feedback">
                        Por favor escriba un numero de protocolo
                    </div>
                </div>

                <div class="col-12 col-md-4 mb-3">
                    <label for="numeroVisitas" class="form-label"> Numero de visitas totales: </label>
                    <input type="number" class="form-control valid" id="numeroVisitas" size="10" placeholder="Ej. 15 visitas" min="1"  required v-model.number="protocolo.numeroVisitas"> <!--Si el tipo es numero al v-model se le explica esto-->
                    <div class="invalid-feedback">
                        Por favor escriba un numero de visitas
                    </div>
                </div>

                <div class="col-12 col-md-4 mb-3">
                    <label for="muestrario" class="form-label"> Color de identificacion de protocolo: </label> 
                    <input type="color" class="form-control form-control-color valid" id="muestrario" required v-model="protocolo.color"> <!--El color se toma como string-->
                    <div class="invalid-feedback">
                        Por favor escoga un color para el protocolo
                    </div>
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
                                <td>Dias ventana en cada cita/visita:</td>
                                <td>Visita cero: </td>
                                <td>Visita EOS:</td>
                                <td>Visita EOT:</td>
                                <td>Agregar</td>
                                <td>Eliminar</td>
                            </tr>
                        </thead>

                        <!--Cuerpo de la tabla-->
                        <tbody>
                            <tr v-for="(visita, index) in protocolo.visitas" :key="index">
                                <td>
                                    <label for="tipoNomenclatura" class="form-label"> {{index+1}} </label>
                                </td>

                                <td>
                                    <input type="text" class="form-control valid" id="tipoNomenclatura" placeholder="Ej. V1,V2,...Vn " required v-model="visita.nomeclatura"> 
                                    <div class="invalid-feedback">
                                        Por favor escriba el tipo de nomenclatura para esta visita
                                    </div>
                                </td>

                                <td>
                                    <select class="form-select valid" id="tipoPeriodo" aria-describedby="Pregunta que tipo de periodo se usara por esta visita" required v-model="visita.tipoDePeriodo">
                                        <option selected disabled value="" >Seleccione</option>  <!--El select toma la opcion-->
                                        <option>Dia</option>
                                        <option>Semana</option>
                                        <option>Mes</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Por favor seleccione el tipo de periodo para esta visita
                                    </div>
                                </td>

                                <td>
                                    <input type="number" class="form-control valid" id="tamPeriodo" placeholder="Ej. 3 dias/semanas" required v-model="visita.tamanioPeriodo">
                                    <div class="invalid-feedback">
                                        Por favor escriba el tamaño de periodo para esta visita
                                    </div>
                                </td>

                                <td>
                                    <div class="d-flex gap-2 justify-content-center">
                                        <select class="form-select valid" id="ventana" aria-describedby="Pregunta tendra ventana en esta cita" required v-model="visita.ventana">
                                            <option selected disabled value="">Seleccione</option>
                                            <option>+</option>
                                            <option>-</option>
                                            <option>+/-</option>
                                            <option>Ninguno</option>
                                        </select>
                                        <div class="invalid-feedback">
                                            Por favor no deje vacio el campo, en caso de no haber colocar la ultima opcion y en el siguiente colocar 0. 
                                        </div>

                                        <input type="number" class="form-control valid" id="ventana" min="0"  max="4" required v-model="visita.dias">
                                        <div class="invalid-feedback">
                                            Por favor no deje vacio el campo
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <input type="checkbox" v-on:click="verificarVisitaCero(index)" v-model="visita.visitaCero" name='zero'>
                                </td>

                                <td>
                                    <input type="checkbox" v-on:click="verificarVisitaEos(index)" v-if="indexVisitaCero <= index"  v-model="visita.eotEstudio" name='eos'>
                                </td>

                                <td>
                                    <input type="checkbox" v-on:click="verificarVisitaEot(index)"  v-if="indexVisitaCero <= index" v-model="visita.eotTratamiento" name='eot'>
                                </td>
                                <td>
                                    <button type="button" v-on:click="agregarDato(index)" class="btn btn-success">+</button>

                                </td>
                                <td>
                                    <button type="button" v-on:click="eliminarDato(index)" class="btn btn-danger">-</button>
                                </td>
                                <br>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="d-flex gap-2 justify-content-end mb-3 ">
                    <button type="submit" class="btn btn-primary" >Modificar</button>
                    <button type="submit" class="btn btn-primary" v-on:click="handleDelete()">Eliminar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
    import {Protocolo} from "../interfaces/Protocolos"
    import { consultarProtocolo, modificarProtocolo, eliminarProtocolo } from '../services/ProtocoloServices';
    import { defineComponent } from 'vue'
    export default defineComponent({
        data(){
            return{
                protocolo: {} as Protocolo,
                indexVisitaCero:-1,
            }
        },
        methods:{
            async buscarProtocolo(id:string){
                const res = await consultarProtocolo(id)
                this.protocolo = res.data
                for(let i = 0; i < this.protocolo.visitas.length; i++){
                    if(this.protocolo.visitas[i].visitaCero){
                        this.indexVisitaCero = i
                        break
                    }
                }
            },
            async handleUpdate(){
                if (this.tamPerMenMay()) {
                    modificarProtocolo(this.protocolo._id, this.protocolo)
                    this.$router.push('/listaprotocolos')
                } else {
                    alert('los tamaños de periodos deben ir de menor a mayor')
                }
            },
            async handleDelete(){
                eliminarProtocolo(this.protocolo._id)
                this.$router.push("/")
            },
            verificarVisitaCero(index: number){
                for (let i = 0; i < this.protocolo.visitas.length; i++) {
                    if(i !== index){
                        this.protocolo.visitas[i].visitaCero = false
                    }else{
                        if(this.protocolo.visitas[i].eotEstudio){
                            this.protocolo.visitas[i].eotEstudio = false
                        }
                        if(this.protocolo.visitas[i].eotTratamiento){
                            this.protocolo.visitas[i].eotTratamiento = false
                        }
                    }
                }
                this.indexVisitaCero = index
                this.generarNegativos()
            },
            verificarVisitaEos(index: number){
                for (let i = 0; i < this.protocolo.visitas.length; i++) {
                    if(i !== index){
                        this.protocolo.visitas[i].eotEstudio = false
                    }else{
                        if (this.protocolo.visitas[i].visitaCero == true) {
                            this.protocolo.visitas[i].visitaCero = false
                        }
                    }
                }
            },
            verificarVisitaEot(index: number){
                for (let i = 0; i < this.protocolo.visitas.length; i++) {
                    if(i !== index){
                        this.protocolo.visitas[i].eotTratamiento = false
                    }else{
                        if (this.protocolo.visitas[i].visitaCero == true) {
                            this.protocolo.visitas[i].visitaCero = false
                        }
                    }
                }
                
                if (index >  this.indexVisitaCero) {
                    this.protocolo.visitas[index].eotTratamiento = false
                }
            },
            agregarDato(index: number){
                this.protocolo.visitas.splice(index+1, 0, {
                    nomeclatura: "",
                    tipoDePeriodo: "Dia",
                    tamanioPeriodo: 1,
                    visitaCero: false,
                    ventana: "Ninguna",
                    dias: 0,
                    eotEstudio: false,
                    eotTratamiento: false,
                });

            },
            eliminarDato(index: number){
                let remove = this.protocolo.visitas.splice(index,1);           
            },
            generarNegativos(){ //metodo para generar los negativos antes de la visita cero
                for (let i = 0; i < this.protocolo.visitas.length; i++) {
                    if (i < this.indexVisitaCero) {
                        if (this.protocolo.visitas[i].tamanioPeriodo > 0) {
                            this.protocolo.visitas[i].tamanioPeriodo = this.protocolo.visitas[i].tamanioPeriodo * -1
                        }
                    } else {
                        if ((i > this.indexVisitaCero) && (this.protocolo.visitas[i].tamanioPeriodo < 0)) {
                            this.protocolo.visitas[i].tamanioPeriodo = this.protocolo.visitas[i].tamanioPeriodo * -1
                        }else{
                            if(i == this.indexVisitaCero){
                                this.protocolo.visitas[i].tamanioPeriodo = 0;
                            }
                        }
                    }
                }
            },
            tamPerMenMay(){ //metodo para verificar si el tamaño del periodo es mayor que el tamaño del periodo anterior
                for (let i = 0; i < this.protocolo.visitas.length; i++) {
                    if((i+1 < this.protocolo.visitas.length)){
                        if(!(this.protocolo.visitas[i].tamanioPeriodo < this.protocolo.visitas[i+1].tamanioPeriodo)){
                            return false
                        }
                    }
                }
                return true
            }

        },
        mounted(){
            if(typeof this.$route.params.id === 'string'){
                this.buscarProtocolo(this.$route.params.id)
            }
        }
    })
</script>

<style scoped>
    header {
        background: var(--fondo-contenido);
    }

    body {
        background: #F8F8FF;
        padding: 10px;
    }

    li{
        list-style: none;
    }

    tr {
    background: #59ffb1; 
    }
</style>

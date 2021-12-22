<template lang="">
    <div class="container">
        <div class="row mt-3">
            <header class="row text-center" >
                <h2>Registro de Protocolo</h2>
                <p>Formulario visitas</p>
            </header>
            <form class="row" action="Protocolo.html" method="get" id="contenedor" @submit.prevent="guardarVisita()">
                <div class="table-responsive">
                    <table class="table table-primary table-hover table-sm table-bordered">
                        <caption>Formulario de visitas</caption>
                        <!--Encabezados-->
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
                        <!--Cuerpo-->
                        <tbody>
                            <tr v-for="(visita, index) in arrVisitas" :key="index">
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
                                    <input type="number" class="form-control valid" id="tamPeriodo" required v-model="visita.tamanioPeriodo">
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

                                        <input type="number" class="form-control valid" id="ventana" min="0" required v-model="visita.dias">
                                        <div class="invalid-feedback">
                                            Por favor no deje vacio el campo
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <input type="checkbox" v-on:click="verificarVisitaCero(index)" v-model="visita.visitaCero" name='zero'>
                                </td>

                                <td>
                                    <input type="checkbox" v-on:click="verificarVisitaEos(index)" v-if="indexVisitaCero <= index" v-model="visita.eotEstudio" name='eos'>
                                </td>

                                <td>
                                    <input type="checkbox" v-on:click="verificarVisitaEot(index)" v-if="indexVisitaCero <= index" v-model="visita.eotTratamiento" name='eot'>
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
                <div class="d-flex gap-2 justify-content-end mb-3">
                    <button type="submit" class="btn btn-primary">Siguiente</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { Visitas } from '../interfaces/Visitas'
import {defineComponent} from 'vue'
import {Protocolo} from '../interfaces/Protocolos'
import {consultarProtocolo, modificarProtocolo } from '../services/ProtocoloServices'

export default defineComponent({
    data() {
        return{
            protocolo:{} as Protocolo,
            arrVisitas:[] as Visitas[],
            indexVisitaCero:-1,
        }
    },
    methods:{
        async cargarProtocolo(id: string){ //metodo para traer el protocolo de la base de datos
            const res = await consultarProtocolo(id)
            this.protocolo = res.data
            this.arrVisitas = this.protocolo.visitas
        },
        async guardarVisita(){ //metodo para guardar la visita en la base de datos
            if (this.tamPerMenMay()) {
                this.protocolo.visitas = this.arrVisitas
                let id = this.$route.params.id.toString()
                modificarProtocolo(id , this.protocolo)
                this.$router.push('/protocolo/agregar')
            } else {
                alert('los tamaños de periodos deben ir de menor a mayor')
            }
        },
        verificarVisitaCero(index: number){ //metodo para verificar si la visita cero esta activa
            for (let i = 0; i < this.arrVisitas.length; i++) {
                if(i !== index){
                    this.arrVisitas[i].visitaCero = false
                }else{
                    if(this.arrVisitas[i].eotEstudio){
                        this.arrVisitas[i].eotEstudio = false
                    }
                    if(this.arrVisitas[i].eotTratamiento){
                        this.arrVisitas[i].eotTratamiento = false
                    }
                }
            }
            this.indexVisitaCero = index
            this.generarNegativos()
        },
        verificarVisitaEos(index: number){ //metodo para verificar si la visita eos esta activa
            for (let i = 0; i < this.arrVisitas.length; i++) {
                if(i !== index){
                    this.arrVisitas[i].eotEstudio = false
                }else{
                    if (this.arrVisitas[i].visitaCero == true) { //si la visita cero esta activa entonces la eos no puede estar activa
                        this.arrVisitas[i].visitaCero = false
                    }
                }
            }
        },
        verificarVisitaEot(index: number){ //metodo para verificar si la visita eot esta activa
            for (let i = 0; i < this.arrVisitas.length; i++) {
                if(i !== index){
                    this.arrVisitas[i].eotTratamiento = false
                }else{
                    if (this.arrVisitas[i].visitaCero == true) { //si la visita cero esta activa entonces la eot no puede estar activa
                        this.arrVisitas[i].visitaCero = false
                    }
                }
            }
        },
        agregarDato(index: number){//metodo para agregar una visita
            this.arrVisitas.splice(index+1, 0, {
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
        eliminarDato(index: number){ //metodo para eliminar una visita
            this.arrVisitas.splice(index,1);           
        },
        generarNegativos(){ //metodo para generar los negativos antes de la visita cero
            for (let i = 0; i < this.arrVisitas.length; i++) {
                if (i < this.indexVisitaCero) {
                    if (this.arrVisitas[i].tamanioPeriodo > 0) {
                        this.arrVisitas[i].tamanioPeriodo = this.arrVisitas[i].tamanioPeriodo * -1
                    }
                } else {
                    if ((i > this.indexVisitaCero) && (this.arrVisitas[i].tamanioPeriodo < 0)) {
                        this.arrVisitas[i].tamanioPeriodo = this.arrVisitas[i].tamanioPeriodo * -1
                    }else{
                        if(i == this.indexVisitaCero){
                            this.arrVisitas[i].tamanioPeriodo = 0;
                        }
                    }
                }
            }
        },
        generarArregloTamanio(){ // metodo para generar el arreglo de tamaños de periodos de las visitas dependiendo del tipo de periodo
            let meses: number[] = []
            meses.push(31) //enero
            meses.push(28) //febrero
            meses.push(31) //marzo
            meses.push(30) //abril
            meses.push(31) //mayo
            meses.push(30) //junio
            meses.push(31) //julio
            meses.push(31) //agosto
            meses.push(30) //septiembre
            meses.push(31) //octubre
            meses.push(30) //noviembre
            meses.push(31) //diciembre
            let arrTamanio: number[] = []
            for (let i = 0; i < this.arrVisitas.length; i++) {
                if(this.arrVisitas[i].tipoDePeriodo === "Semana"){
                    arrTamanio.push(this.arrVisitas[i].tamanioPeriodo * 7)
                }else{
                    if(this.arrVisitas[i].tipoDePeriodo === "Mes"){
                        let totalD = 0
                        for (let j = 0; j < this.arrVisitas[i].tamanioPeriodo; j++) {
                            totalD = totalD + meses[j]
                        }
                        arrTamanio.push(totalD)
                    }else{
                        arrTamanio.push(this.arrVisitas[i].tamanioPeriodo)
                    }
                }
            }
            return arrTamanio
        },
        tamPerMenMay(){ //metodo para verificar si el tamaño del periodo es mayor que el tamaño del periodo anterior
            let arreglo = this.generarArregloTamanio()
            for (let i = 0; i < arreglo.length; i++) {
                if((i+1 < arreglo.length)){
                    if(!(arreglo[i] < arreglo[i+1])){
                        return false
                    }
                }
            }
            return true
        }
    },
    mounted(){
        if(typeof this.$route.params.id === 'string'){
            this.cargarProtocolo(this.$route.params.id)
        }
    },
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
<template lang="">
    <div class="container">
        <div class="row mt-3">
            <header class="row text-center" >
                <h2>Registro de Protocolo</h2>
                <p>Formulario visita</p>
            </header>
            <form class="row" action="Protocolo.html" method="get" id="contenedor" @submit.prevent="guardarVisita()">
                    <table border="1" align="center">
                        <tr>
                            <td>
                                <div class="col-12 col-md-4 mb-3">
                                    <label for="tipoNomenclatura" class="form-label"> N°: </label>
                                </div>
                            </td>
                            <td>
                                <div class="col-12 col-md-4 mb-3">
                                    <label for="tipoNomenclatura" class="form-label"> Tipo de Nomenclatura: </label>
                                </div>
                            </td>
                            <td>
                                <!--Agrege la opcion de mes en el combobox
                                No se si afecte en algo la logica o el v-model o como guarde los datos-->
                                <div class="col-12 col-md-4 mb-3">
                                    <label for="tipoPeriodo" class="form-label"> Tipo de periodo: </label>
                                </div>
                            </td>
                            <td>
                                <div class="col-12 col-md-4 mb-3">
                                    <label for="tamPeriodo" class="form-label"> Tamaño del periodo: </label>
                                </div>
                            </td>
                            <td>
                                <div class="col-12 col-md-4 mb-3">
                                    <label for="visita0" class="form-label">Visita 0:</label>
                                </div>
                            </td>
                            <td>
                                <!--VENTANA SE MODIFICO COMPLETAMNETE AYUDA
                                Dias antes y dias despues
                                es un campo dos respuestas no supe como poner el v-model -->
                                <div class="col-12 col-md-4 mb-3">
                                    <label for="ventana" class="form-label">Dias ventana en cada cita/visita:</label>
                                </div>
                            </td>
                            <td>
                                <!--Aqui cambie el v-model porque ya no se introduce un numero
                                ahora se selcciona la opcion no se si este bien revisen porfa-->
                                <div class="col-12 col-md-4 mb-3">
                                    <label for="visitaEOS" class="form-label">Esta se condidera como la visita EOS (Fin de Estudio):</label>
                                </div>  
                            </td>
                            <td>
                                <!--Aqui cambie el v-model porque ya no se introduce un numero
                                ahora se selcciona la opcion no se si este bien revisen porfa-->
                                <div class="col-12 col-md-4 mb-3">
                                    <label for="visitaEOT" class="form-label">Visita EOT (Fin de Tratamiento):</label>
                                </div>  
                            </td>
                        </tr>
                        <tr v-for="(visita, index) in arrVisitas" :key="index">
                            <td>
                                <div class="col-12 col-md-4 mb-3">
                                    <label for="tipoNomenclatura" class="form-label"> {{index+1}} </label>
                                </div>
                            </td>

                            <td>
                                <div>
                                    <input type="text" class="form-control valid" id="tipoNomenclatura" placeholder="Ej. V1,V2,...Vn " required v-model="visita.nomeclatura"> 
                                    <div class="invalid-feedback">
                                        Por favor escriba el tipo de nomenclatura para esta visita
                                    </div>
                                </div>
                            </td>

                            <td>
                                <div>
                                    <select class="form-select valid" id="tipoPeriodo" aria-describedby="Pregunta que tipo de periodo se usara por esta visita" required v-model="visita.tipoDePeriodo">
                                        <option selected disabled value="" >Seleccione</option>  <!--El select toma la opcion-->
                                        <option>Dia</option>
                                        <option>Semana</option>
                                        <option>Mes</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Por favor seleccione el tipo de periodo para esta visita
                                    </div>
                                </div>
                            </td>

                            <td>
                                <div>
                                    <input type="number" class="form-control valid" id="tamPeriodo" min="1" placeholder="Ej. 3 dias/semanas" required v-model="visita.tamanioPeriodo">
                                    <div class="invalid-feedback">
                                        Por favor escriba el tamaño de periodo para esta visita
                                    </div>
                                </div>
                            </td>

                            <td>
                                <div>
                                    <input type="checkbox" v-on:click="verificarVisitaCero(index)" v-model="visita.visitaCero" name='zero'>
                                </div>
                            </td>

                            <td>
                                <div>
                                    <div class="d-flex gap-2 justify-content-center">
                                        <div class="col-12 col-md-6">
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
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <input type="number" class="form-control valid" id="ventana" min="0"  max="4" required v-model="visita.dias">
                                            <div class="invalid-feedback">
                                                Por favor no deje vacio el campo
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td>
                                <div>
                                    <input type="checkbox" v-on:click="verificarVisitaEos(index)" v-model="visita.eotEstudio" name='eos'>
                                </div> 
                            </td>

                            <td>
                                <div>
                                    <input type="checkbox" v-on:click="verificarVisitaEot(index)" v-model="visita.eotTratamiento" name='eot'>
                                </div> 
                            </td>
                            <br>
                        </tr>
                    </table>
                <div class="d-flex gap-2 justify-content-end">
                    <button type="submit" class="btn btn-primary">Siguiente</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
//import {defineComponent} from '../vue'
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
        async cargarProtocolo(id: string){
            const res = await consultarProtocolo(id)
            this.protocolo = res.data
            this.arrVisitas = this.protocolo.visitas
        },
        async guardarVisita(){
            this.protocolo.visitas = this.arrVisitas
            let id = this.$route.params.id.toString()
            modificarProtocolo(id , this.protocolo)
            this.$router.push('/')
        },
        verificarVisitaCero(index: number){
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
        },
        verificarVisitaEos(index: number){
            for (let i = 0; i < this.arrVisitas.length; i++) {
                if(i !== index){
                    this.arrVisitas[i].eotEstudio = false
                }else{
                    if (this.arrVisitas[i].visitaCero == true) {
                        this.arrVisitas[i].visitaCero = false
                    }
                }
                if(this.indexVisitaCero >= i){
                    if(this.arrVisitas[i].visitaCero){
                        this.arrVisitas[i].eotEstudio = false
                        this.arrVisitas[i].eotTratamiento = false
                        this.arrVisitas[i].visitaCero = false
                    }
                }
            }
        },
        verificarVisitaEot(index: number){
            for (let i = 0; i < this.arrVisitas.length; i++) {
                if(i !== index){
                    this.arrVisitas[i].eotTratamiento = false
                }else{
                    if (this.arrVisitas[i].visitaCero == true) {
                        this.arrVisitas[i].visitaCero = false
                    }
                }
                if(this.indexVisitaCero >= i){
                    if(this.arrVisitas[i].visitaCero){
                        this.arrVisitas[i].eotEstudio = false
                        this.arrVisitas[i].eotTratamiento = false
                        this.arrVisitas[i].visitaCero = false
                    }
                }
            }
        },
        
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

    table {

    font: 75%/1.5em arial, geneva, sans-serif;
    border-collapse: collapse;

    }

    td {
    border-bottom: 8px solid #fff;
    border-left: 1px dotted #fff;
    vertical-align: top;
    padding: 20px;
    border-style:groove;
    }

    tr {
    background: #59ffb1; 
    }

</style>
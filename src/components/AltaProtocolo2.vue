<template lang="">
    <div class="container">
        <div class="row mt-3">
            <header class="row text-center" >
                <h2>Registro de Protocolo</h2>
                <p>Formulario visitas</p>
            </header>
            <form class="row" action="Protocolo.html" method="get" id="contenedor" @submit.prevent="guardarVisita()">
                <div class="table-responsive">
                    <table class="table table-hover table-sm table-bordered">
                        <caption>Formulario de visitas</caption>
                        <!--Encabezados-->
                        <thead>
                            <tr>
                                <td>N°:</td>
                                <td>Tipo de Nomenclatura:</td>
                                <td>Tipo de periodo:</td>
                                <td>Tamaño del periodo:</td>
                                <td>Visita 0:</td>
                                <td>Dias ventana en cada cita/visita:</td>
                                <td>Visita EOS (Fin de Estudio):</td>
                                <td>Visita EOT (Fin de Tratamiento):</td>
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
                                    <input type="number" class="form-control valid" id="tamPeriodo" min="1" placeholder="Ej. 3 dias/semanas" required v-model="visita.tamanioPeriodo">
                                    <div class="invalid-feedback">
                                        Por favor escriba el tamaño de periodo para esta visita
                                    </div>
                                </td>

                                <td>
                                    <select class="form-select valid" id="visita0" aria-describedby="Pregunta si esta visita es la 0" required v-model="visita.visitaCero">
                                        <option selected disabled value="">Seleccione</option>
                                        <option>Si</option>
                                        <option>No</option>
                                    </select>
                                    <div id="visita0" class="invalid-feedback">
                                        Por favor, seleccione una opcion
                                    </div>
                                </td>

                                <td>
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
                                </td>

                                <td>
                                    <select class="form-select valid" id="visitaEOS" aria-describedby="Pregunta si esta visita es la EOS" required v-model="visita.eotEstudio">
                                        <option selected disabled value="">Seleccione</option>
                                        <!--Creo que aqui hay error de dedo jaja en v-model le pusiste eotEstudio y es EOS xd-->
                                        <option>Si</option>
                                        <option>No</option>
                                    </select>
                                    <div id="visitaEOS" class="invalid-feedback">
                                        Por favor, seleccione una opcion
                                    </div> 
                                </td>

                                <td>
                                    <select class="form-select valid" id="visitaEOT" aria-describedby="Pregunta si esta visita es la EOT" required v-model="visita.eotTratamiento">
                                        <option selected disabled value="" >Seleccione</option>
                                        <option>Si</option>
                                        <option>No</option>
                                    </select>
                                    <div id="visitaEOT" class="invalid-feedback">
                                        Por favor, seleccione una opcion
                                    </div>
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
//import {defineComponent} from '../vue'
import { Visitas } from '../interfaces/Visitas'
import {defineComponent} from 'vue'
import {Protocolo} from '../interfaces/Protocolos'
import {consultarProtocolo, modificarProtocolo } from '../services/ProtocoloServices'

export default defineComponent({
    data() {
        return{
            protocolo:{} as Protocolo,
            arrVisitas:[] as Visitas[]
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
    
 
    tr {
    background: #59ffb1; 
    }
</style>
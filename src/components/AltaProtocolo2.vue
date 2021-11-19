<template lang="">
    <div class="container">
        <div class="row mt-3">
            <header class="row text-center" >
                <h2>Registro de Protocolo</h2>
                <p>Formulario visita {{this.$route.params.ac}} de {{this.$route.params.to}} </p>
            </header>
            <form class="row" action="Protocolo.html" method="get" id="contenedor" @submit.prevent="guardarVisita()">
                <ul>
                    <li v-for="(visita, index) in arrVisitas" :key="index">
                        <br>
                        <div class="col-12 col-md-4 mb-3">
                            <label for="tipoNomenclatura" class="form-label"> Tipo de Nomenclatura: </label>
                            <input type="text" class="form-control valid" id="tipoNomenclatura" placeholder="Ej. V1,V2,...Vn " required v-model="visita.nomeclatura"> 
                            <div class="invalid-feedback">
                                Por favor escriba el tipo de nomenclatura para esta visita
                            </div>
                        </div>

                        <!--Agrege la opcion de mes en el combobox
                        No se si afecte en algo la logica o el v-model o como guarde los datos-->
                        <div class="col-12 col-md-4 mb-3">
                            <label for="tipoPeriodo" class="form-label"> Tipo de periodo: </label>
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

                        <div class="col-12 col-md-4 mb-3">
                            <label for="tamPeriodo" class="form-label"> Tamaño del periodo: </label>
                            <input type="number" class="form-control valid" id="tamPeriodo" min="1" placeholder="Ej. 3 dias/semanas" required v-model="visita.tamanioPeriodo">
                            <div class="invalid-feedback">
                                Por favor escriba el tamaño de periodo para esta visita
                            </div>
                        </div>

                        <div class="col-12 col-md-4 mb-3">
                            <label for="visita0" class="form-label">Visita 0:</label>
                            <select class="form-select valid" id="visita0" aria-describedby="Pregunta si esta visita es la 0" required v-model="visita.visitaCero">
                                <option selected disabled value="">Seleccione</option>
                                <option>Si</option>
                                <option>No</option>
                            </select>
                            <div id="visita0" class="invalid-feedback">
                            Por favor, seleccione una opcion
                            </div>
                        </div>

                        <!--Recuerden que aqui se quito el numero de semanas anterior-->

                        <!--VENTANA SE MODIFICO COMPLETAMNETE AYUDA
                            Dias antes y dias despues
                            es un campo dos respuestas no supe como poner el v-model -->
                        <div class="col-12 col-md-4 mb-3">
                            <label for="ventana" class="form-label">Dias ventana en cada cita/visita:</label>
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

                        <!--Aqui cambie el v-model porque ya no se introduce un numero
                        ahora se selcciona la opcion no se si este bien revisen porfa-->
                        <div class="col-12 col-md-4 mb-3">
                            <label for="visitaEOS" class="form-label">Esta se condidera como la visita EOS (Fin de Estudio):</label>
                            <select class="form-select valid" id="visitaEOS" aria-describedby="Pregunta si esta visita es la EOS" required v-model="visita.eotEstudio">
                                <option selected disabled value="">Seleccione</option>
                                <!--Creo que aqui hay error de dedo jaja en v-model le pusiste eotEstudio y es EOS xd-->
                                <option>Si</option>
                                <option>No</option>
                            </select>
                            <div id="visitaEOS" class="invalid-feedback">
                            Por favor, seleccione una opcion
                            </div>
                        </div>

                        <!--Aqui cambie el v-model porque ya no se introduce un numero
                        ahora se selcciona la opcion no se si este bien revisen porfa-->
                        <div class="col-12 col-md-4 mb-3">
                            <label for="visitaEOT" class="form-label">Visita EOT (Fin de Tratamiento):</label>
                            <select class="form-select valid" id="visitaEOT" aria-describedby="Pregunta si esta visita es la EOT" required v-model="visita.eotTratamieto">
                                <option selected disabled value="" >Seleccione</option>
                                <option>Si</option>
                                <option>No</option>
                            </select>
                            <div id="visitaEOT" class="invalid-feedback">
                            Por favor, seleccione una opcion
                            </div>
                        </div>
                        <br>
                    </li>
                </ul>
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

</style>
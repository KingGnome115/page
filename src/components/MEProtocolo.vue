import { Protocolo } from '../interfaces/Protocolos';
<template>
    <div class="Contenido"> 
        <div class="row mt-3">
            <header class="row text-center" >
                <h2>Registro de Protocolo</h2>
                <p>Formulario para dar de alta un nuevo protocolo</p>
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

                <div class="row mt-3">
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
                        <tr v-for="(visita, index) in protocolo.visitas" :key="index">
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
                                    <select class="form-select valid" id="visita0" aria-describedby="Pregunta si esta visita es la 0" required v-model="visita.visitaCero">
                                        <option selected disabled value="">Seleccione</option>
                                        <option>Si</option>
                                        <option>No</option>
                                    </select>
                                    <div id="visita0" class="invalid-feedback">
                                        Por favor, seleccione una opcion
                                    </div>
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
                            </td>

                            <td>
                                <div>
                                    <select class="form-select valid" id="visitaEOT" aria-describedby="Pregunta si esta visita es la EOT" required v-model="visita.eotTratamiento">
                                        <option selected disabled value="" >Seleccione</option>
                                        <option>Si</option>
                                        <option>No</option>
                                    </select>
                                    <div id="visitaEOT" class="invalid-feedback">
                                    Por favor, seleccione una opcion
                                    </div>
                                </div>  
                            </td>
                            <br>
                        </tr>
                    </table>
                    <div class="d-flex gap-2 justify-content-end">
                        <button type="submit" class="btn btn-primary">Modificar</button>
                    </div>
                </div>
            </form>
            <div class="d-flex gap-2 justify-content-end">
                <button type="submit" class="btn btn-primary" v-on:click="handleDelete()">Eliminar</button>
            </div>
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
                protocolo: {} as Protocolo
            }
        },
        methods:{
            async buscarProtocolo(id:string){
                const res = await consultarProtocolo(id)
                this.protocolo = res.data
            },
            async handleUpdate(){
                modificarProtocolo(this.protocolo._id, this.protocolo)
                this.$router.push("/")
            },
            async handleDelete(){
                eliminarProtocolo(this.protocolo._id)
                this.$router.push("/")
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
.Contenido{
        padding: 10px;
        background: #a7f19b;
    }

    table, th, tr, td{
        padding: 5px;
        border: 2px solid #4F7849;
        text-align: center;
        border-collapse: collapse;
    }

    .Ope{
        padding: 10px;
        width: 110px;
    }

    .botones{
        margin: auto;
        justify-content: center;
        text-align: center;
    }

    button{
        margin: 10px;
    }

    thead{
        color: #4F7849;
    }

    table {
        font: 75%/1.5em arial, geneva, sans-serif;
        border-collapse: collapse;
        margin-left: 1em;
    }

    td {
        border-bottom: 8px solid #fff;
        border-left: 1px dotted #fff;
        vertical-align: top;
        padding: 20px;
        border-style:groove;
    }
</style>

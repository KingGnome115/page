<template lang="">
    <div class="Contenido">
        <h4 align="center" id="titulo">
            FORMULARIO ALTA DE PROTOCOLOS
        </h4>
        <form class="row g-3" @submit.prevent="guardarProtocolo()">
            <div class="col-md-6">
                <label class="form-label"> Nombre del nuevo protocolo: </label>
                <input type="text" class="form-control" placeholder="Ej. Protocolo 1" v-model="protocolo.nomProtocolo"> <!--Si el tipo es texto solo se toma-->
            </div>

            <div class="col-md-3">
                <label class="form-label"> Numero de protocolo: </label>
                <input type="text" class="form-control"  placeholder="Ej. 10" v-model.number="protocolo.numeroProtocolo">
            </div>

            <div class="col-md-3">
                <label for="numeroVisitas" class="form-label"> Numero de visitas totales: </label>
                <input type="number" class="form-control" size="10" placeholder="Ej. 15 visitas" min="1" v-model.number="protocolo.numeroVisitas"> <!--Si el tipo es numero al v-model se le explica esto-->
            </div>

            <div class="col-md-3">
                <label for="tipoNomenclatura" class="form-label"> Tipo de Nomenclatura: </label>
                <input type="text" class="form-control" placeholder="Ej. V1,V2,...Vn " v-model="protocolo.nomeclatura">
            </div>

            <!--Cambie los radio por un combobox-->
            <legend class="col-form-label col-sm-1 pt-0">Tipo de Periodo:</legend>
            <div class="col-md-2">
                <div class="form-check">
                    <select v-model="protocolo.tipoDePeriodo"> <!--El select toma la opcion-->
                        <option value="Dia" selected >Dia</option>
                        <option value="Semana">Semana</option>
                    </select>
                </div>
            </div>
                
            <div class="col-md-3">
                <label class="form-label"> Tamaño del periodo: </label>
                <input type="number" class="form-control" min="1" placeholder="Ej. 3 dias/semanas" v-model.number="protocolo.tamanioPeriodo">
            </div>

            <div class="col-md-3">
                <label class="form-label"> Visita 0: </label>
                <input type="number" class="form-control" min="2" placeholder="Ej. 3ra vista" v-model.number="protocolo.visitaCero">
            </div>

            <div class="col-md-4">
                <label class="form-label"> Numero de semanas que contiene cada visita anterior:</label>
                <input type="number" class="form-control" min="1" placeholder="Ej. 5 semanas" v-model.number="protocolo.numeroSemanas" >
            </div>

            <div class="col-md-4">
                <label class="form-label">Dias (Antes) de ventana en cada cita/visita:</label>
                <input type="number" class="form-control" min="0" max="3" placeholder="Ej. 2 dias/semanas" v-model.number="protocolo.diasACC" >
            </div>

            <div class="col-md-4">
                <label class="form-label">Dias (Despues) de ventana en cada cita/visita:</label>
                <input type="number" class="form-control" min="0" max="3" placeholder="Ej. 2 dias/semanas" v-model.number="protocolo.diasDCC" >
            </div>

            <div class="col-md-4">
                <label class="form-label">Visita EOS (Fin de Estudio):</label> 
                <input type="text" class="form-control" min="2" placeholder="Ej. 3ra vista" v-model="protocolo.eotEstudio" >
            </div>

            <div class="col-md-4">
                <label class="form-label">Visita EOT (Fin de Tratamiento):</label> 
                <input type="text" class="form-control" min="2" placeholder="Ej. 3ra vista" v-model="protocolo.eotTratamiento" >
            </div>

            <div  class="col-md-4">
                <label class="form-label"> Color de identificacion de protocolo: </label> 
                <input type="color" class="form-control form-control-color" v-model="protocolo.color"> <br> <!--El color se toma como string-->
            </div>

            <div class="col-auto" style="text-align: right;width:1235px">
                <button type="submit" class="btn btn-primary mb-4">Guardar</button>
            </div>

            <!--Hola-->>
        </form>
    </div>
</template>

<script lang="ts">
//import {defineComponent} from '../vue'
import {defineComponent} from 'vue'
import {Protocolo} from '../interfaces/Protocolos'
import { agregarProtocolo } from '../services/ProtocoloServices'

export default defineComponent({
    data() {
        return{
            protocolo:{} as Protocolo,
        }
    },
    methods:{
        async guardarProtocolo(){
            const res = await agregarProtocolo(this.protocolo)
            console.log(this.protocolo)
            console.log(res)
            this.$router.push('/')
        }
    }
})
</script>

<style scoped>
    .Contenido{
        margin: 10px;
    }

    #contenedor {
        width: 1355px;
        margin: 6px auto;
        border: solid 0px rgb(1000, 0, 0);
        font: 1em arial, helvetica, sans-serif;
        color: rgb(0, 0, 0); /*Para el color de la letra*/
    }

    #titulo {
        margin: 6px;
        padding: 2px;
        width: 1355px;
    }

    #nada, #borde, #relleno, #margen, #todos {
        background-color: rgb(42, 27, 252);
        border: solid #08f;
        color: rgb(255, 255, 255); /*Para el color de la letra*/
        width: 1355px;
    }
    #nada {
        margin: 10px;
        padding: 1opx;
        border-width: 1px;
    }
    #borde      {
        margin: 0;
        padding: 0;
        border-width: 20px;
    }
    #relleno    {
        margin: 0;
        padding: 20px;
        border-width: 0;
    }
    #margen     {
        margin: 6px;
        padding: 2px;
        border-width: 0;
    }
    #todos      {
        margin: 20px;
        padding: 20px;
        border-width: 20px;
    }

</style>

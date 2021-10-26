<template lang="">
    <div>
        <h4 align="center" id="titulo">
            FORMULARIO ALTA DE PROTOCOLOS
        </h4>
        <form class="row g-3" action="Protocolo.html" method="get" id="contenedor" @sumbit.prevent="guardarProtocolo()">
            <div class="col-md-6">
                <label for="nombreProtocolo" class="form-label"> Nombre del nuevo protocolo: </label>
                <input type="text" class="form-control" id="nombreProtocolo" placeholder="Ej. Protocolo 1 " v-model="protocolo.nomProtocolo">
            </div>

            <div class="col-md-3">
                <label for="numeroProtocolo" class="form-label"> Numero de protocolo: </label>
                <input type="text" class="form-control" id="numeroProtocolo" placeholder="Ej. 10 " v-model="protocolo.numeroProtocolo">
            </div>

            <div class="col-md-3">
                <label for="numeroVisitas" class="form-label"> Numero de visitas totales: </label>
                <input type="number" class="form-control" id="numeroVisitas" size="10" placeholder="Ej. 15 visitas" min="1" v-model="protocolo.numeroVisitas">
            </div>

            <div class="col-md-3">
                <label for="tipoNomenclatura" class="form-label"> Tipo de Nomenclatura: </label>
                <input type="text" class="form-control" id="tipoNomenclatura" placeholder="Ej. V1,V2,...Vn " v-model="protocolo.nomeclatura">
            </div>

            <!--Radio Buttons Periodo-->
            <legend class="col-form-label col-sm-1 pt-0">Tipo de Periodo:</legend>
            <div class="col-md-2">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="tipoPeriodo" id="periodo1" value="option1" checked v-model="protocolo.nomeclatura">
                    <label class="form-check-label" for="periodo1">
                        Dias
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="tipoPeriodo" id="periodo2" value="option2">
                    <label class="form-check-label" for="periodo2">
                        Semanas
                    </label>
                </div>
            </div>
                
            <div class="col-md-3">
                <label for="tamPeriodo" class="form-label"> Tamaño del periodo: </label>
                <input type="number" class="form-control" id="tamPeriodo" min="1" placeholder="Ej. 3 dias/semanas">
            </div>

            <div class="col-md-3">
                <label for="visita0" class="form-label"> Visita 0: </label>
                <input type="number" class="form-control" id="visita0" min="2" placeholder="Ej. 3ra vista">
            </div>

            <div class="col-md-4">
                <label for="numViSemAnterior" class="form-label"> Numero de semanas que contiene cada visita anterior:</label>
                <input type="number" class="form-control" id="numViSemAnterior" min="1" placeholder="Ej. 5 semanas">
            </div>

            <div class="col-md-4">
                <label for="ventanaAntes" class="form-label">Dias (Antes) de ventana en cada cita/visita:</label>
                <input type="number" class="form-control" id="ventanaAntes" min="0" max="3" placeholder="Ej. 2 dias/semanas">
            </div>

            <div class="col-md-4">
                <label for="ventanaDespues" class="form-label">Dias (Despues) de ventana en cada cita/visita:</label>
                <input type="number" class="form-control" id="ventanaDespues" min="0" max="3" placeholder="Ej. 2 dias/semanas">
            </div>

            <div class="col-md-4">
                <label for="visitaEOS" class="form-label">Visita EOS (Fin de Estudio):</label> 
                <input type="number" class="form-control" id="visitaEOS" min="2" placeholder="Ej. 3ra vista">
            </div>

            <div class="col-md-4">
                <label for="visitaEOT" class="form-label">Visita EOT (Fin de Tratamiento):</label> 
                <input type="number" class="form-control" id="visitaEOT" min="2" placeholder="Ej. 3ra vista">
            </div>

            <div  class="col-md-4">
                <label for="color" class="form-label"> Color de identificacion de protocolo: </label> 
                <input type="color" class="form-control form-control-color" value="#0d6efd" id="muestrario"> <br>
            </div>

            <div class="col-auto" style="text-align: right;width:1235px">
                <button type="submit" class="btn btn-primary mb-4">Guardar</button>
            </div>

            <div class="col-auto">
                <button type="reset" class="btn btn-primary mb-4">Cancelar</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {Protocolo} from '@/interfaces/Protocolos'
import { agregarProtocolo } from '@/services/ProtocoloServices'

export default defineComponent({
    data() {
        return{
            protocolo: {} as Protocolo
        }
    },
    methods:{
        async guardarProtocolo(){
            const res = await agregarProtocolo(this.protocolo)
            this.$router.push('/')
        }

    }
})
</script>

<style scoped>
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

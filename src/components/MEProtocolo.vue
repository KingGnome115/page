import { Protocolo } from '../interfaces/Protocolos';
<template>
    <div class="Contenido"> 
        <h1>Detalles de Protocolos</h1>
        <div class="col-md-12 ">
            <table class="table table-bordered table-hover">
                <thead>
                    <th>Nombre Protocolo</th>
                    <th>Número</th>
                    <th>No Visitas</th>
                    <th>Nomeclaruta</th> 
                    <th>Tipo de periodo</th>
                    <th>Tamaño del periodo</th>
                    <th>Visita 0</th>
                    <th>Numero de semanas</th>
                </thead>
                <tr>
                    <th> {{protocoloActual.nomProtocolo}} </th>
                    <th> {{protocoloActual.numeroProtocolo}} </th>
                    <th> {{protocoloActual.numeroVisitas}} </th>
                    <th> {{protocoloActual.nomeclatura}} </th>
                    <th> {{protocoloActual.tipoDePeriodo}} </th>
                    <th> {{protocoloActual.tamanioPeriodo}} </th>
                    <th> {{protocoloActual.visitaCero}} </th>
                    <th> {{protocoloActual.numeroSemanas}} </th>
                </tr>
            </table>

            <div class="botones">
                <button class="btn btn-primary mb-4" type="" @click="handleDelete()">Eliminar</button>
                <button class="btn btn-primary mb-4" type="">Modificar</button>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
    import {Protocolo} from "@/interfaces/Protocolos"
    import { consultarProtocolo, modificarProtocolo, eliminarProtocolo } from '../services/ProtocoloServices';
    import { defineComponent } from 'vue'
    export default defineComponent({
        data(){
            return{
                protocoloActual: {} as Protocolo
            }
        },
        methods:{
            async buscarProtocolo(id:string){
                const res = await consultarProtocolo(id)
                this.protocoloActual = res.data
            },
            async handleUpdate(){
                modificarProtocolo(this.protocoloActual._id, this.protocoloActual)
                this.$router.push("/")
            },
            async handleDelete(){
                eliminarProtocolo(this.protocoloActual._id)
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
</style>

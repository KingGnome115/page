<template lang="">
    <div class="container">
        <table class="table table-primary table-hover table-sm table-bordered" id="excel">
            <!--Encabezados-->
            <thead>
                <tr>
                    <td>Pacientes:</td>
                    <td v-for="(visita, index) in protocolo.visitas" :key="index">
                        <table>
                            <tr>
                                <td>
                                    {{visita.nomeclatura}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {{visita.tipoDePeriodo}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {{visita.tamanioPeriodo}}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </thead>
            <!--Cuerpo-->
            <tbody>
                <tr v-for="(cita, index) in citas" :key="index">
                    <td> {{pacientes[index].nomPila}}  {{pacientes[index].primApellido}}  {{pacientes[index].segApellido}}
                    <input type="checkbox" v-on:click="AgregarEliminar(index)">
                    </td>
                    <td v-for="(visita, index) in cita.visitas" :key="index">
                        <input type="date" min="1920-01-01" max="2023-12-31" class="form-control valid" id="fechaR" required v-model="visita.citaFecha">
                        <input type="checkbox" v-model="visita.realizada">
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex gap-2 justify-content-end mb-3 ">
            <button type="submit" class="btn btn-primary" >Modificar</button>
            <button type="submit" class="btn btn-primary" v-on:click="eliminarCitas()">Eliminar</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { Citas } from '../interfaces/Citas'
    import { Paciente } from '../interfaces/Paciente'
    import { obtenerCitasProtocolo, eliminarCitas } from '../services/CitasServices'
    import { Protocolo } from "../interfaces/Protocolos"
    import { consultarProtocolo } from '../services/ProtocoloServices'
    import { consultarPaciente } from '../services/PacienteServices'
    export default defineComponent({
        data(){
            return{
                citas:[] as Citas[],
                pacientes: [] as Paciente[],
                protocolo: {} as Protocolo,
                citasE: [] as Citas[],
            }
        },
        methods: {
            async cargarDatos(id: string){ //Metodo para cargar los pacientes y las citas y el protocolo
                let res = await obtenerCitasProtocolo(id)
                if(typeof res.data == 'object'){
                    this.citas = res.data
                    for (let i = 0; i < this.citas.length; i++) {
                        let pa = await consultarPaciente(this.citas[i].idPaciente)
                        this.pacientes.push(pa.data)
                    }
                }
                const ress = await consultarProtocolo(id)
                this.protocolo = ress.data
            },
            AgregarEliminar(index: number){
                if(this.citasE.includes(this.citas[index])){
                    this.citasE.splice(this.citasE.indexOf(this.citas[index]), 1)
                }else{
                    this.citasE.push(this.citas[index])
                }
            },
            eliminarCitas(){
                for (let i = 0; i < this.citasE.length; i++) {
                    eliminarCitas(this.citasE[i]._id)
                }
            }
    },
        mounted(){
        if(typeof this.$route.params.id === 'string'){
            this.cargarDatos(this.$route.params.id)
        }
    },
    })
</script>

<style scoped>
    header {
        background: var(--fondo-contenido);
    }

    body {
        background: #A8F8FF;
        padding: 10px;
    }

    li{
        list-style: none;
    }

    tr {
    background: #61dc93; 
    }

    .container {
        margin: 0 auto;
        max-width: 95%;
    }

    .table {
        overflow:scroll;
        height:200px;
        width:500px;
    }
</style>
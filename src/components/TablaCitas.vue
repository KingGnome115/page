<template lang="">
    <div class="container">
        <table class="table table-primary table-hover table-sm table-bordered">
            <!--Encabezados-->
            <thead>
                <tr>
                    <td>Pacientes:</td>
                    <td v-for="(visita, index) in protocolo.visitas" :key="index"> <h4>{{visita.nomeclatura}}</h4> <h5>{{visita.tamanioPeriodo}}</h5> <h6>{{visita.tipoDePeriodo}}</h6> </td>
                </tr>
            </thead>
            <!--Cuerpo-->
            <tbody>
                <tr v-for="(cita, index) in citas" :key="index">
                    <td> {{pacientes[index].nomPila}}  {{pacientes[index].primApellido}}  {{pacientes[index].segApellido}} </td>
                    <td v-for="(visita, index) in cita.visitas" :key="index"> {{visita.citaFecha}} </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue'
    import { Citas } from '../interfaces/Citas'
    import { Paciente} from '../interfaces/Paciente'
    import {obtenerCitasProtocolo} from '../services/CitasServices'
    import {Protocolo} from "../interfaces/Protocolos"
    import { consultarProtocolo } from '../services/ProtocoloServices'
    import { consultarPaciente } from '../services/PacienteServices'
    export default defineComponent({
        data(){
            return{
                citas:[] as Citas[],
                pacientes: [] as Paciente[],
                protocolo: {} as Protocolo,
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
        background: #F8F8FF;
        padding: 10px;
    }

    li{
        list-style: none;
    }

    tr {
    background: #59ffb1; 
    }

    /*Centrar un div al 60%*/
    .container {
        margin: 0 auto;
        max-width: 95%;
    }
</style>
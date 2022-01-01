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
                    <!--<td> {{pacientes[index].nomPila}}  {{pacientes[index].primApellido}}  {{pacientes[index].segApellido}}
                    <input type="checkbox" v-on:click="AgregarEliminar(index)">
                    </td>-->
                    <td></td>
                    <td v-for="(visita, index) in cita.visitas" :key="index">
                        <input type="date" min="1920-01-01" max="2023-12-31" class="form-control valid" id="fechaR" required v-model="visita.citaFecha">
                        <input type="checkbox" v-model="visita.realizada">
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex gap-2 justify-content-end mb-3 ">
            <button type="submit" class="btn btn-primary" v-on:click="modificarCitas()">Modificar</button>
            <button type="submit" class="btn btn-primary" v-on:click="eliminarCitas()">Eliminar</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { Citas } from '../interfaces/Citas';
    import { Paciente } from '../interfaces/Paciente'
    import { obtenerCitasProtocolo, eliminarCitas } from '../services/CitasServices'
    import { Protocolo } from '../interfaces/Protocolos'
    import { consultarProtocolo } from '../services/ProtocoloServices'
    import { consultarPaciente } from '../services/PacienteServices'
    export default defineComponent({
        data(){
            return{
                citas:[] as Citas[],
                citas2:[] as Citas[],
                pacientes: [] as Paciente[],
                protocolo: {} as Protocolo,
                citasE: [] as Citas[],
            }
        },
        methods: {
            async cargarDatos(id: string){ //Metodo para cargar los pacientes y las citas y el protocolo
                let res = await obtenerCitasProtocolo(id)
                let res2 = await obtenerCitasProtocolo(id)
                if(typeof res.data == 'object' && typeof res2.data == 'object'){
                    this.citas = res.data
                    this.citas2 = res2.data
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
            },
            modificarCitas(){
                for (let i = 0; i < this.pacientes.length; i++) {
                    for (let j = 0; j < this.citas[i].visitas.length; j++) {
                        console.log('visita: '+j+'\n')
                        let res = this.validarVentana(j,i);
                        if(!res){
                            alert('La fecha de la cita '+ (j+1) + ' del paciente ' +' '+this.pacientes[i].nomPila+ ' no es valida')
                        }
                    }
                    alert('Se modificaron las citas del paciente '+this.pacientes[i].nomPila)
                }
            },
            validarVentana(index: number, i: number){ //index es la cita y i es el paciente
                if(this.protocolo.visitas[index].ventana === 'Ninguno'){
                    console.log('Ninguno')
                    let fechaN = this.citas[i].visitas[index].citaFecha
                    let fechaO = this.citas2[i].visitas[index].citaFecha
                    if(fechaN === fechaO){
                        return true
                    }else{
                        return false
                    }
                }else{
                    let dia: number = 1000 * 60 * 60 * 24 //Un dia es igual a 1000 milisegundos * 60 segundos * 60 minutos * 24 horas 
                    let fechaA: Date = new Date(this.citas2[i].visitas[index].citaFecha)
                    let fechaN: Date = new Date(this.citas[i].visitas[index].citaFecha)
                    if(this.protocolo.visitas[index].ventana === '+'){
                        console.log('+')
                        let fechaL = new Date(fechaA.getTime() + dia*(this.protocolo.visitas[index].dias))
                        if(fechaN >= fechaA && fechaN <= fechaL){
                            return true
                        }else{
                            return false
                        }
                    }else{
                        if(this.protocolo.visitas[index].ventana === '-'){
                            console.log('-')
                            let fechaL = new Date(fechaA.getTime() - dia*(this.protocolo.visitas[index].dias))
                            if(fechaN <= fechaA && fechaN >= fechaL){
                                return true
                            }else{
                                return false
                            }
                        }else{
                            console.log('+/-')
                            if(this.protocolo.visitas[index].ventana === '+/-'){
                                let fechaL = new Date(fechaA.getTime() + dia*(this.protocolo.visitas[index].dias))
                                let fechaL2 = new Date(fechaA.getTime() - dia*(this.protocolo.visitas[index].dias))
                                if(fechaN >= fechaL2 && fechaN <= fechaL){
                                    return true
                                }else{
                                    return false
                                }
                            }
                        }
                    }
                }
                return false
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
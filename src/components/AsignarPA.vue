<template lang="">
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-6">
                <header class="row text-align" >
                    <h2>Pacientes</h2>
                </header>
                <form>           
                    <div class="col-12 mt-3 mb-3">
                        <input v-model="nombrePaciente" v-on:keypress="reconPa" type="text" autocomplete="off" v-bind="statePaciente" @input="filterStatesPaciente" class="form-control valid barraBusqueda" placeholder="Nombre del paciente" v-on:keyup.enter="buscarDataPaciente">
                    </div>

                    <div class="col-12 col-md-4 mt-3 mb-3">
                        <button class="btn btn-primary"  v-on:click="buscarDataPaciente">Buscar</button>
                    </div>

                    <div>
                        <ul class="list">
                            <li v-for="(filt, index) in filteredStatesPaciente" :key="index" @click="buscaDataPaciente(filt)"> {{filt}} </li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>

    <hr>

        <form class="row" @submit.prevent="guardarCitas()">
            <!--Tabla-->
            <div class="table-responsive">
                <table class="table table-primary table-hover table-sm table-bordered">
                    <caption>Lista de pacientes</caption>
                    <!--Encabezado-->
                    <thead>
                        <tr>
                            <td>Paciente</td>
                            <td>Quitar</td>
                        </tr>
                    </thead>

                    <!--Cuerpo de la tabla-->
                    <tbody>
                        <tr v-for="(paciente, index) in pacientesCitas" :key="index">
                            <td>
                                <label for="NombrePaciente" class="form-label"> {{paciente.nomPila}} {{paciente.primApellido}} {{paciente.segApellido}} </label>
                            </td>

                            <td>
                                <button type="button" v-on:click="eliminarDato(index)" class="btn btn-danger">-</button>
                            </td>
                            <br>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="d-flex gap-2 justify-content-end mb-3">
                <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
        </form>
    </div>

    
</template>

<script lang="ts" >
    import { defineComponent } from "vue";
    import { Doctor } from '../interfaces/Doctor';
    import { Paciente } from "../interfaces/Paciente";
    import { consultarPacientesRex, consultarPacienteNom } from '../services/PacienteServices';
    export default defineComponent({
        data(){
            return {
                //Datos del doctor
                doctor: {} as Doctor,
                //Lista que mandare
                pacientesCitas: [] as Paciente[],
                pacienteE: {} as Paciente,

                //Lista de pacientes
                pacientes: [] as string[],
                //Para la barra de busqueda de pacientes
                nombrePaciente: '',
                statePaciente: '',
                statesPacientes: [] as string[],
                filteredStatesPaciente: [] as string[],
                
            }
        },
        methods: {
            async cargarPacientes(){
                const res = await consultarPacientesRex('a');
                if(typeof res.data !== 'undefined'){
                    this.pacientes = res.data as string[];
                }
                this.pacientes.forEach(element => {
                    this.statesPacientes.push(element);
                });
            },
            async buscaDataPaciente(nom : string){
                let pacienteB = ""
                this.pacientes.forEach(paciente => {
                    if(paciente.toLowerCase() == nom.toLowerCase()){
                        pacienteB = paciente;
                        this.nombrePaciente = ''
                        //llamar al metodo filterStatesPaciente()
                        this.filterStatesPaciente();
                    }
                });
                if(pacienteB !== ''){
                    let nombre = pacienteB.split('-');
                    const res = await consultarPacienteNom(nombre[0], nombre[1], nombre[2]);
                    this.pacienteE = res.data as Paciente;
                    console.log(this.pacienteE);
                    console.log(this.pacientesCitas);
                    console.log(!this.pacientesCitas.includes(this.pacienteE))
                    if (!this.pacientesCitas.includes(this.pacienteE)) {
                        this.pacientesCitas.push(this.pacienteE);
                        this.nombrePaciente = ''
                        //llamar al metodo filterStatesPaciente()
                        this.filterStatesPaciente();
                    }
                }
            },
            filterStatesPaciente() {
                if(this.nombrePaciente.length === 0){
                    this.filteredStatesPaciente = []
                }else{
                    this.filteredStatesPaciente = this.statesPacientes.filter(state => {
                        return state.toLowerCase().includes(this.nombrePaciente.toLowerCase())
                    })
                }
            },
            async reconPa(){
                if(this.nombrePaciente !== ''){
                    const res = await consultarPacientesRex(this.nombrePaciente);
                    if(typeof res.data !== 'undefined'){
                        this.pacientes = res.data as string[];
                    }

                    this.pacientes.forEach(element => {
                        if(!this.statesPacientes.includes(element)){
                            this.statesPacientes.push(element);
                        }
                    });
                    this.filterStatesPaciente();
                }
            },
            eliminarDato(index : number){
                this.pacientesCitas.splice(index, 1);
            },
        },
    })

</script>

<style scoped>
    header {
        background: var(--fondo-contenido);
    }

    body {
        background: #F8F8FF;
        padding: .5em;
    }  
</style>
<template lang="">
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-6">
                <header class="row text-align" >
                    <h2>Doctores</h2>
                </header>
                <form>           
                    <div class="col-12 mt-3 mb-3">
                        <input v-model="nombreDoctor" v-on:keypress="reconDo" type="text" autocomplete="off" v-bind="stateDoctor" @input="filterStatesDoctor" class="form-control valid barraBusqueda" placeholder="Nombre del doctor" >
                    </div>

                    <div>
                        <ul class="list">
                            <li v-for="(filt, index) in filteredStatesDoctores" :key="index" @click="buscaDataDoctor(filt)"> {{filt}} </li>
                        </ul>
                    </div>
                </form>
            </div>

            <div class="col-12 col-md-6">
                <header class="row text-align" >
                    <h2>Pacientes</h2>
                </header>
                <form>           
                    <div class="col-12 mt-3 mb-3">
                        <input v-model="nombrePaciente" v-on:keypress="reconPa" type="text" autocomplete="off" v-bind="statePaciente" @input="filterStatesPaciente" class="form-control valid barraBusqueda" placeholder="Nombre del paciente" v-on:keyup.enter="buscarDataPaciente">
                    </div>

                    <div>
                        <ul class="list">
                            <li v-for="(filt, index) in filteredStatesPaciente" :key="index" @click="buscaDataPaciente(filt)"> {{filt}} </li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>

        <!--Mostrar como titulo en medio el nombre del doctor-->
        <div class="row">
            <div class="col-12">
                <h2>Asignar paciente al doctor:  {{this.doctor.nombre}} </h2>
            </div>
        </div>


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
    import { consultarDoctoresRex, consultarDoctorNom } from '../services/DoctorServices';
    import { actualizarPacientesDoc } from '../services/DoctorServices';
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
                //Lista de doctores
                doctores: [] as string[],
                //Para la barra de busqueda de pacientes
                nombrePaciente: '',
                statePaciente: '',
                statesPacientes: [] as string[],
                filteredStatesPaciente: [] as string[],
                //Para la barra de busqueda de doctores
                nombreDoctor: '',
                stateDoctor: '',
                statesDoctor: [] as string[],
                filteredStatesDoctores: [] as string[],
            }
        },
        methods: {
            async cargar(){
                const res = await consultarPacientesRex('a');
                if(typeof res.data !== 'undefined'){
                    this.pacientes = res.data as string[];
                }
                this.pacientes.forEach(element => {
                    this.statesPacientes.push(element);
                });

                const resD = await consultarDoctoresRex('a');
                if(typeof resD.data !== 'undefined'){
                    this.doctores = resD.data as string[];
                }
                this.statesDoctor.forEach(element => {
                    this.statesDoctor.push(element);
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
                    if (!this.pacientesCitas.includes(this.pacienteE)) {
                        this.pacientesCitas.push(this.pacienteE);
                        this.nombrePaciente = ''
                        //llamar al metodo filterStatesPaciente()
                        this.filterStatesPaciente();
                    }
                }
            },
            async buscaDataDoctor(nom : string){
                let doctorB = ""
                this.doctores.forEach(doctor => {
                    if(doctor.toLowerCase() == nom.toLowerCase()){
                        doctorB = doctor;
                        this.nombreDoctor = ''
                        //llamar al metodo filterStatesPaciente()
                        this.filterStatesDoctores();
                    }
                });
                if(doctorB !== ''){
                    let enc = await consultarDoctorNom(doctorB);
                    this.doctor = enc.data as Doctor;
                    this.filterStatesDoctores();
                }
                console.log(this.doctor);
            },
            filterStatesDoctores(){
                if(this.nombreDoctor.length === 0){
                    this.filteredStatesDoctores = []
                }else{
                    this.filteredStatesDoctores = this.statesDoctor.filter(state => {
                        return state.toLowerCase().includes(this.nombreDoctor.toLowerCase());
                    });
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
            async reconDo(){
                if (this.nombreDoctor !== '') {
                    const res = await consultarDoctoresRex(this.nombreDoctor);
                    if(typeof res.data !== 'undefined'){
                        this.doctores = res.data as string[];
                    }

                    this.doctores.forEach(element => {
                        if(!this.statesDoctor.includes(element)){
                            this.statesDoctor.push(element);
                        }
                    });
                    this.filterStatesDoctores();
                }
            }
            ,
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
        mounted() {
            this.cargar();
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
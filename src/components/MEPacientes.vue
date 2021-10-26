<template lang="">

<div>
     <h1>Detalles de Pacientes</h1>

        <!--   List   -->
    <div class="col-md-7">
        <table class="table table-bordered table-hover">
             <thead>
                 <tr>
                    <th>Id</th>
                    <th>Nombre pila</th>
                    <th>Primer Apellido</th>
                    <th>Segundo Apellido</th>
                    <th>CURP</th>
                    <th>Iniciales</th>
                    <th>No. Identificacion</th>
                    <th>Fecha Nacimiento</th>
                    <th>Estado civil</th> <!-- checar como funciona estas opciones creo-->
                    <th>Genero</th> 
                    <th>Raza</th>
                    <th>Etnia</th>
                    <th>Escolaridad</th>
                    <th>Ocupación</th>
                    <th>Telefono</th>
                    <th>Doicilio</th>
                    <th>Fecha realizado</th>
                    <th>Lugar origen</th>
                    <th>Hospital referencia</th>
                    <th>Operaciones</th>

                        <!--
                        <th>Contacto referencia</th>
                        <th>Nombre de pila</th>
                        <th>Primer apellido</th>
                        <th>Segundo apellido</th>
                        <th>Parentesco</th>
                        -->
                        
                </tr>
            </thead>
            <tbody>
                <!-- aqui es donde va el task
                    <% for (var i= 0; i<task.length; i++){ %>
                        <tr>
                            <td> <%= task[i]._id %></td>
                            <td> <%= task[i].nomPila %></td>
                            <td> <%= task[i].primApellido %></td>
                            <td> <%= task[i].secApellido %></td>
                            <td> <%= task[i].curp %></td>
                            <td> <%= task[i].iniciales %></td>
                            <td> <%= task[i].nIdentificacion %></td>
                            <td> <%= task[i].fechaNacimiento %></td>
                            ...
                            <td>
                                <a href="/edit/ <td> <%= task[i]._id %></td>" class="btn btn-info">Editar</a>
                                 <a href="/delete/ <td> <%= task[i]._id %></td>" class="btn btn-danger">Eliminar</a>

                            </td>

                      
                        </tr>
                        } 
                    
                    
                    -->
                <tr></tr>
            </tbody>
        </table>

    </div>


        <!-- <h1>Detalles de tareas</h1>
        <form @submit.prevent="handleUpdate()">
            <input type="text" v-model="pacienteActual.titulo">
            <textarea rows="3" v-model="pacienteActual.descripcion"></textarea>
            <button type="">Actualizar</button>
        </form>
        
        <button @click="handleDelete()">Eliminar</button>
        -->
</div>
</template>
<script lang="ts">
    import { Paciente } from "../interfaces/Paciente";
    import { consultarPaciente, modificarPaciente, eliminarPaciente } from "../services/PacienteServices";
    import { defineComponent } from "@vue/runtime-core";    
    export default defineComponent({
        data(){
            return{
                pacienteActual: {} as Paciente
            }
        },
        methods:{
            async buscarPaciente(id: string){
               const res = await consultarPaciente(id)
               this.pacienteActual = res.data
            },
            async handleUpdate(){
                modificarPaciente(this.pacienteActual._id,this.pacienteActual)
                this.$router.push("/")
            },
            async handleDelete(){
                eliminarPaciente(this.pacienteActual._id)
                this.$router.push("/")
            }
        },
        mounted(){
            if(typeof this.$route.params.id === 'string'){
                this.buscarPaciente(this.$route.params.id)
            }
        }
    })
</script>
<style scoped>
    
</style>
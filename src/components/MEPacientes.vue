<template lang="">
    <div class="Contenido"> 
        <h1>Detalles de Pacientes</h1>
        <div class="col-md-12 ">
            <table class="table table-bordered table-hover">
                <thead>
                    <th>Nombre pila</th>
                    <th>CURP</th>
                    <th>No. Identificacion</th>
                    <th>Genero</th> 
                    <th>Raza</th>
                    <th>Etnia</th>
                    <th>Telefono</th>
                    <th>Domicilio</th>
                    <th>Fecha realizado</th>
                    <th>Lugar origen</th>
                    <th>Hospital referencia</th>
                </thead>
                <tr>
                    <th> {{pacienteActual.nomPila}} 
                         {{pacienteActual.primApellido}}
                         {{pacienteActual.segApellido}} </th>
                    <th> {{pacienteActual.curp}} </th>
                    <th> {{pacienteActual.noIdent}} </th>
                    <th> {{pacienteActual.genero}} </th>
                    <th> {{pacienteActual.raza}} </th>
                    <th> {{pacienteActual.etnia}} </th>
                    <th> {{pacienteActual.telefono}} </th>
                    <th> {{pacienteActual.domicilio}} </th>
                    <th> {{pacienteActual.fechaRea}} </th>
                    <th> {{pacienteActual.lugarOrigen}} </th>
                    <th> {{pacienteActual.hospitalRef}} </th>
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
    import { Paciente } from "@/interfaces/Paciente";
    import { consultarPaciente, modificarPaciente, eliminarPaciente } from "@/services/PacienteServices";
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
    .Contenido{
        padding: 10px;
        background: #a7f19b;
    }

    table, th, tr, td{
        padding: 5px;
        width: 100%;
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
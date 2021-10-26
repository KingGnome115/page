<template lang="">
    <div class="Contenido">
        <h4 align="center" id="titulo">
            REGISTRO DE PACIENTES
        </h4>
        <!------->
        <form class="row g-3" @submit.prevent="guardarPaciente()">
            <div class="col-mid-1 pnomap">
                <div class="col-md-3 nomap">
                    <label for="Name" class="form-label"> Nombre de pila</label>
                    <input type="text" class="form-control" v-model="paciente.nomPila" >
                </div>   

                <div class="col-md-4 nomap">
                    <label for="apellido" class="form-label"> Primer apellido</label>
                    <input type="text" class="form-control" v-model="paciente.primApellido" >
                </div>

                <div class="col-md-3 nomap">
                    <label for="apellido2" class="form-laabel">Segundo apellido</label>
                    <input type="text" class="form-control" v-model="paciente.segApellido" >
                </div>
            </div>

            <div>
                <div class="col-md-6 cin">
                <label for="name">CURP:</label>
                <input type="text" class="form-control" v-model="paciente.curp">
                </div>

                <div class="col-md-2 cin">
                    <label for="inicial">Iniciales:</label>
                    <input type="text" class="form-control" v-model="paciente.iniciales">
                </div>

                <div class="col-md-3 cin">
                    <label for="name">No.Identificacion:</label>
                    <input type="number" class="form-control" v-model="paciente.noIdent">
                </div>
            </div>
            <div>
                <label for="fechaNac">Fecha Nacimiento</label>
                <li>
                    <input type="date"
                    min="1920-01-01" max="2023-12-31"
                    v-model="paciente.fechaNac">
                </li>

                <div class="col-md-4">
                <label for="estadoCi">Estado Civil</label>
                    <select name="ECivil" size="1" v-model="paciente.estadoCivil"> 
                        <option value="default" selected class="form-control"> 
                            --- seleccione su estado civil --- 
                        </option> 
                        <option value="soltero"> 
                            soltero
                        </option> 
                        <option value="Casado"> 
                            casado 
                        </option> 
                        <option value="divorciado"> 
                            Divoricado
                        </option> 
                        <option value="Viudo"> 
                            Viudo
                        </option> 
                    </select> 
                </div>
                         
                <div class="col-md-4">
                    <label for="estadoCi">Genero</label>
                        <select name="genero" size="1" v-model="paciente.genero"> 
                            <option value="default" selected> 
                                    --- sleccione su genero--- 
                            </option> 
                            <option value="Hombre"> 
                                    HOMBRE
                            </option> 
                            <option value="Mujer"> 
                                    MUJER
                            </option> 
                            <option value="ND"> 
                                NO DEFINIDO
                            </option> 
                        </select> 
                </div>
            </div>
            
            <div class="col-md-9 nomap cin">

                <div class="col-md-4 cin nomap">
                    <label for="name">RAZA :</label>
                    <input type="text" class="form-control" v-model="paciente.raza">
                </div>

                <div class="col-md-4 cin nomap">
                    <label for="name">ETNIA :</label>
                    <input type="text" class="form-control" v-model="paciente.etnia">
                </div>
                
            </div>
            <div class="col-md-4">
                <label for="Escolaridad"> Escolaridad</label>
                <select name="escolaridad" size="1" v-model="paciente.escolaridad"> 
                <option value="default" selected> 
                    --- sleccione--- 
                </option> 
                <option value="Primaria"> 
                    PRIMARIA
                </option> 
                <option value="SECUNDARIA"> 
                SECUNDARIA
                </option> 
                <option value="PREPARATORIA"> 
                PREPARATORIA
                </option> 
                <option value="UNIVERSIDAD"> 
                    UNIVERSIDAD
                </option> 
                </select> 
            </div>
            

            <div>
                <div class="col-md-3 nomap">
                <label for="telefono">Ocupación </label>
                <input type="text" class="form-control" v-model="paciente.ocupacion">
                </div>
                
                <div class="col-md-3 nomap">
                <label for="telefono">Telefono:</label>
                <input type="number" size="10" class="form-control" v-model="paciente.telefono">
                </div>
                
                <div class="col-md-5 nomap">
                <label for="name">Domicilio:</label>
                <input type="text" class="form-control" v-model="paciente.domicilio">
                </div>
            </div>


            <div>
                <div  class="col-md-4">
                    <label for="fechaR">Fecha realizado</label>
                <input type="date"
                            min="1920-01-01" max="2023-12-31" v-model="paciente.fechaRea">
                </div>
                
                <div class="col-md-4">
                    <label for="name">Lugar origen:</label>
                    <input type="text" class="form-control" v-model="paciente.lugarOrigen">
                </div>
            
                <div class="col-md-4">
                    <label for="name">Hospital referencia:</label>
                    <input type="text" class="form-control" v-model="paciente.hospitalRef">
                </div>
            </div>

            <hr>
            
            <div class="col-md-4">
                <br>
                <legend class="col-form-label col-sm-0 pt-0">Contacto de referencia</legend>

                <label for="name">Nombre de pila :</label>
                <input type="text" class="form-control" v-model="paciente.nomPilaCon">
                
                <label for="apellido">Primer apellido:</label>
                <input type="text" class="form-control" v-model="paciente.primApellidoCon">

                <label for="apellido2">Segundo apellido:</label>
                <input type="text" class="form-control" v-model="paciente.segApellidoCon">

                <label for="name">Parentesco:</label>
                <input type="text" class="form-control" v-model="paciente.parentesco">

                <label for="name">Telefono:</label>
                <input type="text" class="form-control" v-model="paciente.telefonoCon">
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
    import {Paciente} from '../interfaces/Paciente'
    import {agregarPaciente} from '../services/PacienteServices'

    export default defineComponent({
        data(){
            return {
                paciente:{} as Paciente
            }
        },
        methods: {
            async guardarPaciente(){
                const res = await agregarPaciente(this.paciente)
                this.$router.push('/')
            }
        }
    })
</script>

<style scoped>
    .Contenido{
        padding: 10px;
    }

    div{
        display: inline-block;
        text-align: center;
        margin: auto;
    }

    .nomap, .cin{
        display: inline-block;
        margin: 10px;
    }
</style>
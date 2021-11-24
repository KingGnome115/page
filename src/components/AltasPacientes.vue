<template lang="">
    <div class="container">
        <div class="row mt-3">
            <header class="row text-center" >
                <h2>Registro de Pacientes</h2>
                <p>Formulario para dar de alta un nuevo paciente</p>
            </header>

            <form class="row g-3" @submit.prevent="guardarPaciente()">
                <div class="col-12 col-md-4 mb-3">
                    <label for="Name" class="form-label"> Nombre de pila <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.nomPila" >
                </div>   

                <div class="col-12 col-md-4 mb-3">
                    <label for="apellido" class="form-label"> Primer apellido<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.primApellido" >
                </div>

                <div class="col-12 col-md-4 mb-3">
                    <label for="apellido2" class="form-laabel">Segundo apellido<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.segApellido" >
                </div>
                
                <div class="col-12 col-md-3 mb-3">
                    <label for="inicial">Iniciales <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.iniciales">
                </div>

                <div class="col-12 col-md-6 mb-3">
                    <label for="name">CURP<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.curp">
                </div>

                <div class="col-12 col-md-3 mb-3">
                    <label for="name">No.Identificacion<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="number" class="form-control" v-model="paciente.noIdent">
                </div>
                
                <div class="col-12 col-md-3 mb-3">
                    <label for="fechaNac">Fecha Nacimiento<abbr title="required" aria-label="required">*</abbr></label>
                    <li>
                        <input type="date"
                        min="1920-01-01" max="2023-12-31"
                        v-model="paciente.fechaNac">
                    </li>
                </div>

                <!--Estado civil-->
                <div class="col-12 col-md-3 mb-3">
                    <label for="ECivil" class="form-label"> Estado civil </label> 
                    <select class="form-select valid" id="ECivil" aria-describedby="Estado civil" required v-model="paciente.estadoCivil">
                        <option selected disabled value="">Seleccione</option>
                        <option>Soltero</option>
                        <option>Casado</option>
                        <option>Divorciado</option>
                        <option>Viudo</option>
                    </select>
                    <div id="ECivil" class="invalid-feedback">
                        Por favor, seleccione una opcion
                    </div>
                </div>

                <!--Genero-->
                <div class="col-12 col-md-3 mb-3">
                    <label for="genero" class="form-label"> Genero </label> 
                    <select class="form-select valid" id="genero" aria-describedby="Genero" required v-model="paciente.genero">
                        <option selected disabled value="">Seleccione</option>
                        <option>Hombre</option>
                        <option>Mujer</option>
                        <option>No definido</option>
                    </select>
                    <div id="genero" class="invalid-feedback">
                        Por favor, seleccione una opcion
                    </div>
                </div>

                <div class="col-12 col-md-3 mb-3">
                    <label for="name">Raza <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.raza">
                </div>

                <div class="col-12 col-md-3 mb-3">
                    <label for="name">Etnia<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.etnia">
                </div>

                <!--Escolaridad--> 
                <div class="col-12 col-md-3 mb-3">
                    <label for="escolaridad" class="form-label"> Escolaridad </label> 
                    <select class="form-select valid" id="genero" aria-describedby="Escolaridad" required v-model="paciente.escolaridad">
                        <option selected disabled value="">Seleccione</option>
                        <option>Primaria</option>
                        <option>Secundaria</option>
                        <option>Preparatoria</option>
                        <option>Universidad</option>
                    </select>
                    <div id="escolaridad" class="invalid-feedback">
                        Por favor, seleccione una opcion
                    </div>
                </div>

                <div class="col-12 col-md-3 mb-3">
                    <label for="telefono">Ocupación<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.ocupacion">
                </div>
                    
                <div class="col-12 col-md-3 mb-3">
                    <label for="telefono">Telefono<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="number" size="10" class="form-control" v-model="paciente.telefono">
                </div>
                    
                <div class="col-12 mb-3">
                    <label for="name">Domicilio<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.domicilio">
                </div>

                <div  class="col-12 col-md-4">
                    <label for="fechaR">Fecha realizado<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="date" min="1920-01-01" max="2023-12-31" v-model="paciente.fechaRea">
                </div>
                    
                <div class="col-12 col-md-4">
                    <label for="name">Lugar origen<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.lugarOrigen">
                </div>
                
                <div class="col-12 col-md-4">
                    <label for="name">Hospital referencia<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.hospitalRef">
                </div>

                <hr>
                
                <legend class="col-form-label col-sm-0 pt-0">Contacto de referencia</legend>

                <div class="col-12 col-md-4">
                    <label for="name">Nombre de pila<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.nomPilaCon">
                </div>

                <div class="col-12 col-md-4">
                    <label for="apellido">Primer apellido<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.primApellidoCon">
                </div>

                <div class="col-12 col-md-4">
                    <label for="apellido2">Segundo apellido<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.segApellidoCon">
                </div>
                    
                <div class="col-12 col-md-4">
                    <label for="name">Parentesco<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.parentesco">
                </div>

                <div class="col-12 col-md-4">
                    <label for="name">Telefono<abbr title="required" aria-label="required">*</abbr></label>
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
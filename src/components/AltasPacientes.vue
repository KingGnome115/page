<template lang="">
    <div class="container">
        <div class="row mt-3">
            <header class="row text-center" >
                <h2>Registro de Pacientes</h2>
                <p>Formulario para dar de alta un nuevo paciente</p>
            </header>

            <form class="row g-3" @submit.prevent="guardarPaciente()">
                <div class="col-12 col-md-4 mb-3">
                    <label for="Name" class="form-label"> Nombre de pila </label>
                    <input type="text" class="form-control valid" id="nombre" placeholder="Ej. Juan" required v-model="paciente.nomPila">
                    <div class="invalid-feedback">
                        Por favor escriba un nombre
                    </div>
                </div> 

                <div class="col-12 col-md-4 mb-3">
                    <label for="apellido" class="form-label"> Primer apellido </label>
                    <input type="text" class="form-control valid" id="apellido" placeholder="Ej. Perez" required v-model="paciente.primApellido">
                    <div class="invalid-feedback">
                        Por favor escriba un apellido
                    </div>
                </div>

                <div class="col-12 col-md-4 mb-3">
                    <label for="apellido2" class="form-label"> Segundo apellido </label>
                    <input type="text" class="form-control valid" id="apellido2" placeholder="Ej. Mendez" required v-model="paciente.segApellido">
                    <div class="invalid-feedback">
                        Por favor escriba un apellido
                    </div>
                </div>
                
                <div class="col-12 col-md-3 mb-3">
                    <label for="inicial" class="form-label">Iniciales </label>
                    <input type="text" class="form-control valid" id="inicial" placeholder="Ej. JPM" required v-model="paciente.iniciales">
                    <div class="invalid-feedback">
                        Por favor escriba las iniciales
                    </div>
                </div>

                <div class="col-12 col-md-6 mb-3">
                    <label for="curp" class="form-label">CURP</label>
                    <input type="text" class="form-control valid" id="curp" placeholder="Ej. PEMJ060914HHCJULA5" required v-model="paciente.curp">
                    <div class="invalid-feedback">
                        Por favor escriba el CURP
                    </div>
                </div>

                <div class="col-12 col-md-3 mb-3">
                    <label for="numid" class="form-label">No.Identificacion</label>
                    <input type="number" min="1" class="form-control valid" id="numid" placeholder="Ej. 10" required v-model="paciente.noIdent">
                    <div class="invalid-feedback">
                        Por favor escriba el numero de identificacion 
                    </div>
                </div>
                
                <div class="col-12 col-md-3 mb-3">
                    <label for="fechaNac" class="form-label">Fecha Nacimiento</label>
                    <input type="date" min="1920-01-01" max="2023-12-31" class="form-control valid" id="fechaNac" required v-model="paciente.fechaNac">
                    <div class="invalid-feedback">
                        Por favor ingrese su fecha de nacimiento
                    </div>
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
                    <label for="raza" class="form-label">Raza </label>
                    <input type="text" class="form-control valid" id="raza" placeholder="" required v-model="paciente.raza">
                    <div class="invalid-feedback">
                        Por favor escriba la raza
                    </div>
                </div>

                <div class="col-12 col-md-3 mb-3">
                    <label for="etnia" class="form-label">Etnia</label>
                    <input type="text" class="form-control valid" id="etnia" placeholder="" required v-model="paciente.etnia">
                    <div class="invalid-feedback">
                        Por favor escriba la etnia
                    </div>
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
                    <label for="ocupacion" class="form-label">Ocupación</label>
                    <input type="text" class="form-control valid" id="ocupacion" placeholder="Ej. Obrero" required v-model="paciente.ocupacion">
                    <div class="invalid-feedback">
                        Por favor ingrese la ocupacion
                    </div>
                </div>
                    
                <div class="col-12 col-md-3 mb-3">
                    <label for="telefono" class="form-label">Telefono</label>
                    <input type="number" size="10" class="form-control valid" id="telefono" placeholder="Ej. 7226041050" required v-model="paciente.telefono">
                    <div class="invalid-feedback">
                        Por favor ingrese el telefono
                    </div>
                </div>
                    
                <div class="col-12 mb-3">
                    <label for="domicilio" class="form-label">Domicilio</label>
                    <input type="text" class="form-control valid" id="domicilio" placeholder="Ej. Duraznos 19, Casa Blanca, Metepec, Estado de Mexico, Mexico" required v-model="paciente.domicilio">
                    <div class="invalid-feedback">
                        Por favor ingrese un domicilio valido
                    </div>
                </div>

                <div  class="col-12 col-md-4 mb-3">
                    <label for="fechaR" class="form-label">Fecha realizado</label>
                    <input type="date" min="1920-01-01" max="2023-12-31" class="form-control valid" id="fechaR" required v-model="paciente.fechaRea">
                    <div class="invalid-feedback">
                        Por favor ingrese una fecha valida
                    </div>
                </div>
                    
                <div class="col-12 col-md-4 mb-3">
                    <label for="lugarO" class="form-label">Lugar origen</label>
                    <input type="text" class="form-control valid" id="lugarO" placeholder="Ej. Morelia" required v-model="paciente.lugarOrigen">
                    <div class="invalid-feedback">
                        Por favor ingrese un lugar de origen
                    </div>
                </div>
                
                <div class="col-12 col-md-4 mb-3">
                    <label for="hospitalR" class="form-label">Hospital referencia</label>
                    <input type="text" class="form-control valid" id="hospitalR" placeholder="Ej. Monica Pretelini" required v-model="paciente.hospitalRef">
                    <div class="invalid-feedback">
                        Por favor ingrese un hospital de referencia
                    </div>
                </div>

                <hr>
                
                <!--Info del contacto-->
                <h4 class="col-sm-0 pt-0 mt-3 mb-3">Contacto de referencia</h4>

                <div class="col-12 col-md-4 mb-3">
                    <label for="nameCon" class="form-label">Nombre de pila</label>
                    <input type="text" class="form-control valid" id="nameCon" placeholder="Ej. Maria" required v-model="paciente.nomPilaCon">
                    <div class="invalid-feedback">
                        Por favor ingrese un nombre de contacto
                    </div>
                </div>

                <div class="col-12 col-md-4 mb-3">
                    <label for="apellidoCon" class="form-label">Primer apellido</label>
                    <input type="text" class="form-control valid" id="apellidoCon" placeholder="Ej. Dominguez" required v-model="paciente.primApellidoCon">
                    <div class="invalid-feedback">
                        Por favor ingrese un apellido
                    </div>
                </div>

                <div class="col-12 col-md-4 mb-3">
                    <label for="apellido2Con" class="form-label">Segundo apellido</label>
                    <input type="text" class="form-control valid" id="apellido2Con" placeholder="Ej. Mendez" required v-model="paciente.segApellidoCon">
                    <div class="invalid-feedback">
                        Por favor ingrese un apellido
                    </div>
                </div>
                    
                <div class="col-12 col-md-4 mb-3">
                    <label for="parentescoCon" class="form-label">Parentesco</label>
                    <input type="text" class="form-control valid" id="parentescoCon" placeholder="Ej. Madre" required v-model="paciente.parentesco">
                    <div class="invalid-feedback">
                        Por favor ingrese el parentesco con el paciente
                    </div>
                </div>

                <div class="col-12 col-md-4 mb-3">
                    <label for="telefonoCon" class="form-label">Telefono</label>
                    <input type="text" class="form-control valid" id="telefonoCon" placeholder="Ej. 7224865123" required v-model="paciente.telefonoCon">
                    <div class="invalid-feedback">
                        Por favor ingrese un numero de contacto
                    </div>
                </div>

                <!--Botones-->
                <div class="d-flex gap-2 justify-content-end">
                    <button type="submit" class="btn btn-primary mb-4">Guardar</button>
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
                await agregarPaciente(this.paciente)
                this.$router.push('/')
            }
        }
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

</style>
<template lang="">
    <div class="Contenido">
        <h4 align="center" id="titulo">
            MODIFICACIONESDE PACIENTES
        </h4>
        <!---->
        <form class="row g-3" @submit.prevent="guardarPaciente()">
            <div class="col-mid-1 pnomap">
                <div class="col-md-3 nomap">
                    <label for="Name" class="form-label"> Nombre de pila<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.nomPila" readonly onmousedown="return false;" >
                </div>   

                <div class="col-md-4 nomap">
                    <label for="apellido" class="form-label"> Primer apellido<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.primApellido" readonly onmousedown="return false;" >
                </div>

                <div class="col-md-3 nomap">
                    <label for="apellido2" class="form-laabel">Segundo apellido<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.segApellido" readonly onmousedown="return false;" >
                </div>
            </div>

            <div>
                <div class="col-md-6 cin">
                <label for="name">CURP<abbr title="required" aria-label="required">*</abbr></label>
                <input type="text" class="form-control" v-model="paciente.curp" readonly onmousedown="return false;">
                </div>

                <div class="col-md-2 cin">
                    <label for="inicial">Iniciales <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.iniciales" readonly onmousedown="return false;">
                </div>

                <div class="col-md-3 cin">
                    <label for="name">No.Identificacion<abbr title="required" aria-label="required">*</abbr>label>
                    <input type="number" class="form-control" v-model="paciente.noIdent" readonly onmousedown="return false;">
                </div>
            </div>
            <div>
                <label for="fechaNac">Fecha Nacimiento<abbr title="required" aria-label="required">*</abbr></label>
                <li>
                    <input type="date"
                    min="1920-01-01" max="2023-12-31"
                    v-model="paciente.fechaNac" readonly onmousedown="return false;" >
                </li>

                <div class="col-md-4">
                <label for="estadoCi">Estado Civil<abbr title="required" aria-label="required">*</abbr></label>
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
                    <label for="estadoCi">Genero<abbr title="required" aria-label="required">*</abbr></label>
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
                    <label for="name">RAZA<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.raza" readonly onmousedown="return false;">
                </div>

                <div class="col-md-4 cin nomap">
                    <label for="name">ETNIA<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.etnia" readonly onmousedown="return false;">
                </div>
                
            </div>
            <div class="col-md-4">
                <label for="Escolaridad"> Escolaridad<abbr title="required" aria-label="required">*</abbr></label>
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
                <label for="telefono">Ocupación<abbr title="required" aria-label="required">*</abbr></label>
                <input type="text" class="form-control" v-model="paciente.ocupacion" readonly onmousedown="return false;">
                </div>
                
                <div class="col-md-3 nomap">
                <label for="telefono">Telefono<abbr title="required" aria-label="required">*</abbr></label>
                <input type="number" size="10" class="form-control" v-model="paciente.telefono" readonly onmousedown="return false;">
                </div>
                
                <div class="col-md-5 nomap">
                <label for="name">Domicilio<abbr title="required" aria-label="required">*</abbr></label>
                <input type="text" class="form-control" v-model="paciente.domicilio" readonly onmousedown="return false;">
                </div>
            </div>


            <div>
                <div  class="col-md-4">
                    <label for="fechaR">Fecha realizado<abbr title="required" aria-label="required">*</abbr></label>
                <input type="date"
                            min="1920-01-01" max="2023-12-31" v-model="paciente.fechaRea" readonly onmousedown="return false;">
                </div>
                
                <div class="col-md-4">
                    <label for="name">Lugar origen<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.lugarOrigen" readonly onmousedown="return false;">
                </div>
            
                <div class="col-md-4">
                    <label for="name">Hospital referencia<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" class="form-control" v-model="paciente.hospitalRef" readonly onmousedown="return false;">
                </div>
            </div>

            <hr>
            
            <div class="col-md-4">
                <br>
                <legend class="col-form-label col-sm-0 pt-0">Contacto de referencia</legend>

                <label for="name">Nombre de pila<abbr title="required" aria-label="required">*</abbr></label>
                <input type="text" class="form-control" v-model="paciente.nomPilaCon" readonly onmousedown="return false;">
                
                <label for="apellido">Primer apellido<abbr title="required" aria-label="required">*</abbr></label>
                <input type="text" class="form-control" v-model="paciente.primApellidoCon" readonly onmousedown="return false;">

                <label for="apellido2">Segundo apellido<abbr title="required" aria-label="required">*</abbr></label>
                <input type="text" class="form-control" v-model="paciente.segApellidoCon" readonly onmousedown="return false;">

                <label for="name">Parentesco<abbr title="required" aria-label="required">*</abbr></label>
                <input type="text" class="form-control" v-model="paciente.parentesco" readonly onmousedown="return false;">

                <label for="name">Telefono<abbr title="required" aria-label="required">*</abbr></label>
                <input type="text" class="form-control" v-model="paciente.telefonoCon" readonly onmousedown="return false;">
            </div>

            <div class="col-auto" style="text-align: right;width:1235px">
                <button type="submit" class="btn btn-primary mb-4">Guardar y modificar </button>
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
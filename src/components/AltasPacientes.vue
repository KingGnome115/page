<template lang="">
    <div class="Contenido">
        <h4 align="center" id="titulo">
            REGISTRO DE PACIENTES
        </h4>
        <!------->
        <form class="row g-3" action="REGISTROPACIENTE.html" method="get" id="contenedor">
            <div class="col-mid-6 pnomap">
                <div class="col-md-4 nomap">
                    <label for="Name" class="form-label"> Nombre de pila</label>
                    <input type="text" class="form-control" id="nombre" >
                </div>   

                <div class="col-md-4 nomap">
                    <label for="apellido" class="form-label"> Primer apellido</label>
                    <input type="text" class="form-control" id="PrimeApellido" >
                </div>

                <div class="col-md-3 nomap">
                    <label for="apellido2" class="form-laabel">Segundo apellido</label>
                    <input type="text" id="seapel" name="segapellido" class="form-control">
                </div>
            </div>

            <div>
                <div class="col-md-6 cin">
                <label for="name">CURP:</label>
                <input type="text" id="name" name="paciente" class="form-control">
                </div>

                <div class="col-md-2 cin">
                    <label for="inicial">Iniciales:</label>
                    <input type="text" id="incilaes" name="inipaciente" class="form-control">
                </div>

                <div class="col-md-3 cin">
                    <label for="name">No.Identificacion:</label>
                    <input type="number" id="name" name="paciente" class="form-control">
                </div>
            </div>
            <div>
                <br>
            </div>

            <div >
                <div class="col">
                    <legend class="col-form-label col-sm-2 pt-0">Fecha Nacimiento</legend>
                    <input type="date" id="start" name="trip-start" value="2018-07-22" min="1920-01-01" max="2023-12-31">

                </div>                

                <div class="col-md-4">
                <legend class="col-form-label col-sm-1 pt-0">Estado Civil</legend>
                    <select name="ECivil" size="1"> 
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
                    <legend class="col-form-label col-sm-1 pt-0">Genero</legend>
                        <select name="genero" size="1"> 
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
                    <input type="text" id="name" name="paciente" class="form-control">
                    
                </div>

                <div class="col-md-4 cin nomap">
                    <label for="name">ETNIA :</label>
                    <input type="text" id="name" name="paciente" class="form-control">
                </div>
                
            
                <div class="col-md-3 cin">
                    <label for="Escolaridad"> Escolaridad</label>
                    <select name="escolaridad" size="1"> 
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

            </div>
            

            <div>
                <div class="col-md-3 nomap">
                <label for="telefono">Ocupación </label>
                <input type="text" id="ocupacion" name="Ocuppaciente" class="form-control">
                </div>
                
                <div class="col-md-3 nomap">
                <label for="telefono">Telefono:</label>
                <input type="number" id="tel" size="10" name="Telfpaciente" class="form-control">
                </div>
                
                <div class="col-md-5 nomap">
                <label for="name">Domicilio:</label>
                <input type="text" id="name" name="paciente" class="form-control">
                </div>
            </div>


            <div>
                <div  class="col-md-4">
                    <label for="fechaR">Fecha realizado</label>
                <input type="date" id="start" name="trip-start"
                            value="2018-07-22"
                            min="1920-01-01" max="2023-12-31">
                </div>
                
                <div class="col-md-4">
                    <label for="name">Lugar origen:</label>
                    <input type="text" id="name" name="paciente" class="form-control">
                </div>
            
                <div class="col-md-4">
                    <label for="name">Hospital referencia:</label>
                    <input type="text" id="name" name="paciente" class="form-control">
                </div>

            </div>
            
            <div class="col-md-4">
                <br>
                <legend class="col-form-label col-sm-0 pt-0">Contacto de referencia</legend>

                <label for="name">Nombre de pila :</label>
                <input type="text" id="name" name="paciente" class="form-control">
                
                <label for="apellido">Primer apellido:</label>
                <input type="text" id="PA" name="primap" class="form-control">

                <label for="apellido2">Segundo apellido:</label>
                <input type="text" id="seapel" name="segapellido" class="form-control">

                <label for="name">parentesco:</label>
                <input type="text" id="name" name="paciParentesco" class="form-control">
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
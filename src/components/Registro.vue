<template lang="">
    <div class="container">
        <div class="row mt-3">
            <header class="row text-center">
                <h1>Registro</h1>
                <p>Formulario para registrar un nuevo usuario</p>
            </header>
            <form class="row g-7" @submit.prevent="guardarUsuario()" >
                <div class="col-12 col-md-5 mb-3">
                    <label for="nombre">Usuario:</label>
                    <input type="text" id="nombre" name="nombre" class="form-control" placeholder="Ej. Juan Peréz Mendez" v-model="this.usuarios.user" required>
                    <div class="invalid-feedback">
                        Porfavor ingrese un nombre de usuario
                    </div>
                </div>

                <div class="col-12 col-md-5 mb-3">
                    <label for="email">Correo electrónico:</label>
                    <input type="email" id="email" name="email" class="form-control" placeholder="Ej. Juan15@correo.com" v-model="this.usuarios.email" required>
                    <div class="invalid-feedback">
                        Porfavor ingrese un correo electrónico
                    </div>
                </div>

                <div class="col-12 col-md-5 mb-3">
                    <label for="password">Contraseña:</label>
                    <input type="password" id="password" name="password" class="form-control" v-model="passwordC" title="Una buena contraseña es una frase sin sentido con números y caracteres especiales" required>
                    <div class="invalid-feedback">
                        Porfavor ingrese una contraseña
                    </div>
                </div>

                <div class="col-12 col-md-5 mb-3">
                    <label for="password2">Repetir contraseña:</label>
                    <input type="password" id="password2" name="password2" class="form-control" v-model="this.usuarios.password" title="Una buena contraseña es una frase sin sentido con números y caracteres especiales" required>
                    <div class="invalid-feedback">
                        Porfavor ingrese una contraseña
                    </div>
                </div>

                <div class="col-12 col-md-5 mb-3" >
                    <select  class="form-select valid" v-model="this.usuarios.rol" required >
                        <option selected >Paciente</option>
                        <option>Doctor</option>
                        <option>Administrador</option>
                        <option>Secretaria</option>
                        <option>Enfermera</option>
                        <option>Laboratorio</option>
                        <option>Coordinador</option>
                    </select>
                </div>

                <div class="col-12 col-md-5 mb-3">
                    <select class="form-select valid" title="No seas honesto con la respuesta, solo algo que recuerdes" v-model="this.usuarios.pregunta" >
                        <option>¿Cuál era tu apodo de niño?</option>
                        <option>¿Cuál sería tu trabajo ideal?</option>
                        <option>¿Nombre de tu primera mascota?</option>
                        <option>¿Cuál fue la ciudad en donde naciste?</option>
                        <option>¿Cuál es tu comida favorita?</option>
                        <option>¿Cuál fue tu primer maestro?</option>
                        <option>¿Si fueras un superhéroe, cuáles serían tus poderes?</option>
                        <option>¿Qué harías si te dijeran que mañana es el fin de la humanidad?</option>
                    </select>
                </div>

                <div class="col-12 col-md-5 mb-3">
                    <input type="text" class="form-control" placeholder="Respuesta facil de recordar pero sin sentido" v-model="this.usuarios.respuesta" required>
                    <div class="invalid-feedback">
                        Porfavor ingrese una respuesta
                    </div>
                </div>

                <div></div>

                <div class="col-12 col-md-5 mb-3">
                    <button type="submit" class="btn btn-primary">Registrar</button>
                </div>
            </form>

        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { Usuario } from '../interfaces/Usuarios';
    import { registrarUsuario } from '../services/UsuariosServices';
    export default defineComponent({
        data(){
            return{
                usuarios:{} as Usuario,
                passwordC: ""
            }
        },
        methods: {
            async guardarUsuario(){
                console.log(this.usuarios);
                if(this.passwordC == this.usuarios.password){
                    const newUsuario = registrarUsuario(this.usuarios);
                    console.log(newUsuario);
                }else{
                    alert("Las contraseñas no coinciden")
                    this.passwordC = "";
                    this.usuarios.password = "";
                }
                
            }
        },
        mounted() {
            this.usuarios.rol = "Paciente";
            this.usuarios.pregunta = "¿Cuál era tu apodo de niño?";
        },
    })

</script>

<style scoped>
    
</style>
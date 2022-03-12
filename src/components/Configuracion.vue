<template class="m-0 vh-100 row justify-content-center aling-items-center">
    <div class="container">
        <div class="row mt-3">
            <header class="row text-center">
                <h1>Configuracion</h1>
                <p>Formulario para nueva configuracion</p>
            </header>
            <form class="row g-7" @submit.prevent="guardarUsuario()" >
                <div class="col-12 col-md-5 mb-3">
                    <label for="nombre">Usuario:</label>
                    <input type="text" id="nombre" name="nombre" class="form-control" placeholder="Ej. Juan Peréz Mendez" v-model="this.usuarios.user">
                    <div class="invalid-feedback">
                        Porfavor ingrese un nombre de usuario
                    </div>
                </div>

                <div class="col-12 col-md-5 mb-3">
                    <label for="email">Correo electrónico:</label>
                    <input type="email" id="email" name="email" class="form-control" placeholder="Ej. Juan15@correo.com" v-model="this.usuarios.email">
                    <div class="invalid-feedback">
                        Porfavor ingrese un correo electrónico
                    </div>
                </div>

                <div class="col-12 col-md-5 mb-3">
                    <label for="password2">Contraseña:</label>
                    <input type="password" id="password2" name="password2" class="form-control" v-model="this.usuarios.password" title="Una buena contraseña es una frase sin sentido con números y caracteres especiales">
                    <div class="invalid-feedback">
                        Porfavor ingrese una contraseña
                    </div>
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
                    <input type="text" class="form-control" placeholder="Respuesta facil de recordar pero sin sentido" v-model="this.usuarios.respuesta">
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
    import { actualizarDatos  } from '../services/UsuariosServices';
    import store from '../store/index'
    export default defineComponent({
        data(){
            return{
                usuarios: {} as Usuario,
                passwordC: ""
            }
        },
        methods: {
            async guardarUsuario(){
                console.log(this.usuarios);
                const newUsuario = actualizarDatos(this.usuarios);
                this.$router.push('/')
                
            }
        },
        mounted() {
            this.usuarios = store.state.usuario;
        },
    })

</script>

<style scoped>
    
</style>
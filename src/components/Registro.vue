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
                    <input type="password" id="password" name="password" class="form-control" v-model="passwordC" required>
                    <div class="invalid-feedback">
                        Porfavor ingrese una contraseña
                    </div>
                </div>

                <div class="col-12 col-md-5 mb-3">
                    <label for="password2">Repetir contraseña:</label>
                    <input type="password" id="password2" name="password2" class="form-control" v-model="this.usuarios.password" required>
                    <div class="invalid-feedback">
                        Porfavor ingrese una contraseña
                    </div>
                </div>

                <div class="col-12 col-md-5 mb-3" >
                    <select  class="form-select valid" id="ventana" aria-describedby="Rol" v-model="this.usuarios.rol" required >
                        <option>Paciente</option>
                        <option>Doctor</option>
                        <option>Administrador</option>
                        <option>Secretaria</option>
                        <option>Enfermera</option>
                        <option>Laboratorio</option>
                        <option>Coordinador</option>
                    </select>
                </div>

                <div class="col-12 col-md-5 mb-3">
                    <button type="submit" class="btn btn-primary">Registrar</button>
                </div>
            </form>

            <div class ="col-12 col-md-5 mb3">
                <button class="btn btn-primary" >Olvide contraseña</button>
            </div>

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
    })

</script>

<style scoped>
    
</style>
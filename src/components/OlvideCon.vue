<template class="m-0 vh-100 row justify-content-center aling-items-center">
    <div class="col-auto p-5 text-center" >
        <header class="row text-center">
            <h1>Olvide mi contraseña</h1>
        </header>
        <form class="row g-2 text-center" >
            <div class="col-20 col-md-25 mb-3">
                <label for="email">Correo electrónico:</label>
                <input type="email" id="email" name="email" class="form-control" placeholder="Ej. Juan15@correo.com" v-model="this.email"  required>
                <div class="invalid-feedback">
                    Porfavor ingrese un correo electrónico
                </div>
            </div>
        </form>
        <div class="col-20 col-md-15 mb-3">
            <button class="btn btn-primary" v-on:click="consultarPregunta()">Registrar</button>
        </div>
        
        <form class="row g-2 text-center" v-if="usuarioB" >
            <div>
                <div class="col-20 col-md-25 mb-3">
                    <label for="email">Pregunta:</label>
                    <input type="text" class="form-control" v-model="this.pregunta" disabled >
                </div>

                <div class="col-20 col-md-25 mb-3">
                    <input type="text" class="form-control" placeholder="Respuesta facil de recordar pero sin sentido" v-model="this.respuesta" required>
                    <div class="invalid-feedback">
                        Porfavor ingrese una respuesta
                    </div>
                </div>
            </div>
        </form>
        <div class="col-20 col-md-15 mb-3" v-if="usuarioB" >
            <button class="btn btn-primary" v-on:click="conRespuesta()">Siguiente</button>
        </div>

        <form class="row g-2 text-center" v-if="preguntaB" >
            <div>
                <div class="col-20 col-md-25 mb-3">
                    <label for="email">Nueva contraseña:</label>
                    <input type="password" class="form-control" v-model="this.contrasenia" required>
                </div>

                <div class="col-20 col-md-25 mb-3">
                    <input type="password" class="form-control" v-model="this.contrasenia2" required>
                    <div class="invalid-feedback">
                        Porfavor ingrese una contraseña
                    </div>
                </div>
            </div>
        </form>
        <div class="col-20 col-md-15 mb-3" v-if="preguntaB" >
            <button class="btn btn-primary" v-on:click="Actualizar()">Aceptar</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { consultarPreg, conRespuesta, actualizarContra } from '../services/UsuariosServices';
    export default defineComponent({
        data(){
            return{
                email: '',
                pregunta: '',
                respuesta:'',
                contrasenia: '',
                contrasenia2: '',
                usuarioB: false,
                preguntaB: false,
            }
        },
        methods: {
            async consultarPregunta(){
                let pregunta = await consultarPreg(this.email);
                if(pregunta){
                    this.pregunta = pregunta.data;
                    this.usuarioB = true;
                    console.log(this.pregunta);
                }else{
                    alert("El correo no esta registrado");
                }
            },
            async conRespuesta(){
                let respuestas = await conRespuesta(this.email, this.respuesta);
                let usuario = respuestas.data;
                if(usuario){
                    this.preguntaB = true;
                }else{
                    alert("La respuesta es incorrecta");
                }
            },
            async Actualizar(){
                if(this.contrasenia == this.contrasenia2){
                    let respu = await actualizarContra(this.email, this.contrasenia, this.respuesta);
                    let usuario = respu.data
                    if(usuario){
                        alert("Contraseña actualizada");
                        this.$router.push('/')
                    }else{
                        alert("Error al actualizar contraseña");
                    }
                }else{
                    alert("Las contraseñas no coinciden");
                }
            }
        },
    })

</script>

<style scoped>

</style>
<template class="m-0 vh-100 row justify-content-center aling-items-center">
    <div class="col-auto p-5 text-center" >
        <header class="row text-center">
            <h1>Olvide mi contraseña</h1>
        </header>
        <form class="row g-2 text-center" >
            <div class="col-20 col-md-25 mb-3">
                <label for="email">Correo electrónico:</label>
                <input type="email" id="email" name="email" class="form-control" placeholder="Ej. Juan15@correo.com"  required>
                <div class="invalid-feedback">
                    Porfavor ingrese un correo electrónico
                </div>
            </div>

            <div class="col-20 col-md-15 mb-3">
                <button type="submit" class="btn btn-primary">Registrar</button>
            </div>
        </form>
        
        <form class="row g-2 text-center" v-if="usuarioB" >
            <div>
                <div class="col-20 col-md-25 mb-3">
                    <label for="email">Pregunta:</label>
                    <input type="text" class="form-control" >
                </div>

                <div class="col-20 col-md-25 mb-3">
                    <input type="text" class="form-control" placeholder="Respuesta facil de recordar pero sin sentido"  required>
                    <div class="invalid-feedback">
                        Porfavor ingrese una respuesta
                    </div>
                </div>
            </div>
        </form>

        <form class="row g-2 text-center" v-if="preguntaB" >
            <div>
                <div class="col-20 col-md-25 mb-3">
                    <label for="email">Nueva contraseña:</label>
                    <input type="password" class="form-control" >
                </div>

                <div class="col-20 col-md-25 mb-3">
                    <input type="password" class="form-control" required>
                    <div class="invalid-feedback">
                        Porfavor ingrese una contraseña
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        data(){
            return{
                email: '',
                pregunta: '',
                respuesta: '',
                contrasenia: '',
                contrasenia2: '',
                usuarioB: false,
                preguntaB: false,
            }
        }
    })

</script>

<style scoped>

</style>
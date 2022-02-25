import { Paciente } from '../interfaces/Paciente';
<template lang="">
    <div class="container">
        <div class="row mt-3">
            <header class="row text-center">
                <h1>Registro</h1>
                <p>Formulario para registrar un nuevo usuario</p>
            </header>
            <form class="row g-7">
                <div class="col-12 col-md-5 mb-3">
                    <label for="nombre">Usuario:</label>
                    <input type="text" id="nombre" name="nombre" class="form-control" placeholder="Ej. Juan Peréz Mendez" required>
                    <div class="invalid-feedback">
                        Porfavor ingrese un nombre de usuario
                    </div>
                </div>

                <div class="col-12 col-md-5 mb-3">
                    <label for="email">Correo electrónico:</label>
                    <input type="email" id="email" name="email" class="form-control" placeholder="Ej. Juan15@correo.com" required>
                    <div class="invalid-feedback">
                        Porfavor ingrese un correo electrónico
                    </div>
                </div>

                <div class="col-12 col-md-5 mb-3">
                    <label for="password">Contraseña:</label>
                    <input type="password" id="password" name="password" class="form-control" required>
                    <div class="invalid-feedback">
                        Porfavor ingrese una contraseña
                    </div>
                </div>

                <div class="col-12 col-md-5 mb-3">
                    <label for="password2">Repetir contraseña:</label>
                    <input type="password" id="password2" name="password2" class="form-control" required>
                    <div class="invalid-feedback">
                        Porfavor ingrese una contraseña
                    </div>
                </div>

                <div class="col-12 col-md-5 mb-3" >
                    <select  class="form-select valid" id="ventana" aria-describedby="Rol" required >
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
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        
    }
</script>

<style scoped>
    
</style>
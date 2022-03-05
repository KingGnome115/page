<template lang="">
    <div class="container">
        <div class="table-responsive">
            <table class="table table-primary table-hover table-sm table-bordered">
                <caption>Lista de solicitudes</caption>
                <thead>
                    <tr>
                        <td>Usuario</td>
                        <td>Email</td>
                        <td>Rol</td>
                        <td>Acción</td>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(usuario, index) in usuarios" :key="index" >
                        <td>
                            <label class="form-label" > {{usuario.user}} </label> 
                        </td>
                        <td>
                            <label class="form-label" > {{usuario.email}} </label>
                        </td>
                        <td>
                            <label class="form-label" > {{usuario.rol}} </label>
                        </td>
                        <td class="botones" >
                            <button class="btn btn-success">Aceptar</button>
                            <button class="btn btn-danger" v-on:click="eliminarUsuario(index)" >Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from "vue";
    import { Usuario } from '../interfaces/Usuarios';
    import { consultarUsuariosP, eliminarUP } from '../services/UsuariosServices';
    export default defineComponent({
        data(){
            return{
                usuarios:[] as Usuario[]
            }
        },
        methods: {
            async getUsuarios(){
                const response = await consultarUsuariosP();
                const data = response.data;
                this.usuarios = data;
            },
            async eliminarUsuario(index: number){
                console.log(this.usuarios[index]._id);
                const response = await eliminarUP(this.usuarios[index]._id);
                if(response.status == 200){
                    this.usuarios.splice(index, 1);
                }
            }
        },
        mounted(){
            this.getUsuarios();
        }
    })
</script>

<style scoped>

    body {
        background: #F8F8FF;
        padding: .5em;
    }

    /*separar botones*/
    .botones {
        display: flex;
        justify-content: space-around;
    }

    /*animacion de brillo para los botones*/
    .btn:hover {
        box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.5);
    }

</style>
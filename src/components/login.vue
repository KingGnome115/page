<template lang="">
    <div class="container" >
        <div class="box" >
            <h1>Bienvenido</h1>
            <br>
            <input type="email" id="email" name="email" class="form-control" placeholder="Ej. Juan15@correo.com" v-model="this.email" required>
            <div class="invalid-feedback">
                Porfavor ingrese un correo electrónico
            </div>
            <br>
            <input type="password" class="form-control" v-model="this.pass" required>
            <br>
            <button type="submit" class="btn btn-primary" v-on:click="login()" >Iniciar Sesion</button>
            <li>
                <router-link to="/OlvideCon" class="text-dark">Olvide mi contraseña</router-link>
            </li>
            <li class="text-dark">
                <router-link to="/registro" class="text-dark">Registrarse</router-link>
            </li>
        </div>
    </div>
</template>

<script lang="ts" >
    import {defineComponent} from 'vue'
    import {login} from '../services/UsuariosServices'
    import store from '../store/index'

    export default defineComponent({
        data(){
            return {
                email: '',
                pass: ''
            }
        },
        methods: {
            async login(){
                if(this.email == '' || this.pass == ''){
                    alert('Porfavor ingrese un correo y una contraseña')
                }else{
                    try{
                        const user = await login(this.email, this.pass)
                        console.log(user.status)
                        if(user.status == 200){
                            store.state.usuario = user.data
                            console.log(store.state.usuario.email)
                        }else{
                            console.log(user)
                        }
                    }catch{
                        alert('Error en usuario o contraseña')
                    }
                }
            }
        },
    })

</script>

<style scoped>
    /*centrar div container*/
    .container{
        text-align: center;
        margin-top: 3em;
    }

    .box{
        background-color: #87d8a2;
        padding: 20px;
        border-radius: 5px;
        width: 50%;
        margin: 0 auto;
    }

    li{
        list-style: none;
    }

</style>
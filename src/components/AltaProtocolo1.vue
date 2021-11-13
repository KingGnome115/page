<template lang="">
    <div class="container">
        <div class="row mt-3">
            <header class="row text-center" >
                <h2>Registro de Protocolo</h2>
                <p>Formulario para dar de alta un nuevo protocolo</p>
            </header>

            <form class="row" action="Protocolo.html" method="get" id="contenedor" @submit.prevent="guardarProtocolo()">

                <div class="col-12 mb-3">
                    <label for="nomProtocolo" class="form-label"> Nombre del protocolo: </label>
                    <input type="text" class="form-control valid" id="nomProtocolo" placeholder="Ej. Protocolo 1" required v-model="protocolo.nomProtocolo">
                    <div class="invalid-feedback">
                        Por favor escriba un nombre de Protocolo
                    </div>
                </div>

                <div class="col-12 col-md-4 mb-3">
                    <label for="numeroProtocolo" class="form-label"> Numero de protocolo: </label>
                    <input type="text" class="form-control valid" id="numeroProtocolo" placeholder="Ej. 10 " required v-model.number="protocolo.numeroProtocolo"> <!--Si el tipo es texto solo se toma-->
                    <div class="invalid-feedback">
                        Por favor escriba un numero de protocolo
                    </div>
                </div>

                <div class="col-12 col-md-4 mb-3">
                    <label for="numeroVisitas" class="form-label"> Numero de visitas totales: </label>
                    <input type="number" class="form-control valid" id="numeroVisitas" size="10" placeholder="Ej. 15 visitas" min="1"  required v-model.number="protocolo.numeroVisitas"> <!--Si el tipo es numero al v-model se le explica esto-->
                    <div class="invalid-feedback">
                        Por favor escriba un numero de visitas
                    </div>
                </div>

                <div class="col-12 col-md-4 mb-3">
                    <label for="muestrario" class="form-label"> Color de identificacion de protocolo: </label> 
                    <input type="color" class="form-control form-control-color valid" value="#0d6efd" id="muestrario" required v-model="protocolo.color"> <!--El color se toma como string-->
                    <div class="invalid-feedback">
                        Por favor escoga un color para el protocolo
                    </div>
                </div>

                <!--El boton no redirecciona, pero si valida 
                Se supone debe enviar a la segunda parte de alta de praotocolo
                la de por visitas-->
                <div class="d-flex gap-2 justify-content-end">
                    <button type="submit" class="btn btn-primary" v-on:click="generarFormularios()">Siguiente</button>
                    
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
//import {defineComponent} from '../vue'
import {defineComponent} from 'vue'
import {Protocolo} from '../interfaces/Protocolos'
import { agregarProtocolo } from '../services/ProtocoloServices'

export default defineComponent({
    data() {
        return{
            protocolo:{} as Protocolo,
        }
    },
    methods:{
        async guardarProtocolo(){
            this.protocolo.visitas = [];
            const res = await agregarProtocolo(this.protocolo)
            //console.log(this.protocolo)
            console.table(res.data)
            this.$router.push('/')
        },
        generarFormularios(){
            console.log("El número de visitas seran de "+this.protocolo.numeroVisitas)
        }
    }
})
</script>

<style scoped>
    header {
        background: var(--fondo-contenido);
    }

    body {
        background: #F8F8FF;
        padding: 10px;
    }

</style>
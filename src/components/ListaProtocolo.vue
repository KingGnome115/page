<template lang="">
    <div class="container">
        <div class="row mt-3">
            <header class="row text-align" >
                <h2>Lista de Protocolos</h2>
            </header>
            
            <form class="row">
                <div class="control col-12 col-md-8 mt-3 mb-3">
                    <input v-model="nombreProtocolo" type="text" class="form-control valid barraBusqueda" placeholder="Nombre del protocolo" v-on:keyup.enter="buscarData">
                </div>

                <div class="control col-12 col-md-4 mt-3 mb-3">
                        <button class="btn btn-primary"  v-on:click="buscarData">Buscar</button>
                </div>

                <ul class="list">
                    <li v-for="(protocolo, index) in protocolos" :key="index" @click="this.$router.push(`/protocolos/${protocolo._id}`)">
                        {{protocolo.nomProtocolo}} {{protocolo.numeroProtocolo}} {{protocolo.nomeclatura}} <hr>
                    </li>
                </ul>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue'
    import { consultarProtocolos } from '../services/ProtocoloServices'
    import { Protocolo } from '../interfaces/Protocolos';

    export default defineComponent({
        data(){
            return{
                protocolos: [] as Protocolo[],
                nombreProtocolo: '',
            }
        },
        methods:{
            async cargarProtocolos(){
                const res = await consultarProtocolos()
                this.protocolos = res.data
            },
            async buscarData(){
                this.protocolos.forEach(protocolo => {
                    let nomPro = protocolo.nomProtocolo.toLowerCase()
                    if(nomPro.indexOf(this.nombreProtocolo.toLowerCase()) > -1){
                        this.$router.push(`/protocolos/${protocolo._id}`)
                    }
                })
            }
        },
        mounted(){
            this.cargarProtocolos()
        }
    })

</script>

<style scoped>
    ul{
        display: inline-block;
        margin-left: 4%;
    }

    li{
        padding: 5px;
    }
    
    header {
        background: var(--fondo-contenido);
    }

    body {
        background: #F8F8FF;
        padding: 10px;
    }
</style>
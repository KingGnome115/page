<template lang="">
    <div class="container">
        <div class="row mt-3">
            <header class="row text-align" >
                <h2>Lista de Protocolos</h2>
            </header>
            
            <div class="control col-12 justify-content-end">
                <input v-model="nombreProtocolo" type="text" class="form-control valid barraBusqueda" placeholder="Nombre del protocolo" v-on:keyup.enter="buscarData">
            </div>

            <div class="control justify-content-end">
                    <button class="btn btn-primary"  v-on:click="buscarData">Buscar</button>
            </div>

            <ul class="lista">
                <li v-for="(protocolo, index) in protocolos" :key="index" @click="this.$router.push(`/protocolos/${protocolo._id}`)">
                    {{protocolo.nomProtocolo}} {{protocolo.numeroProtocolo}} {{protocolo.nomeclatura}} <hr>
                </li>
            </ul>
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
    }
    .Contenido{
        padding: 10px;
    }

    .ti{
        font-size: 30px;
        font-weight: bold;
        text-align: center;
    }
    
    .barraBusqueda{
        float: right;
        width: 30%;
        margin: .5em 2em 0 0;
    }

    button{
        float: right;
        width: 15%;
        margin: 3.5em 2em;
    }
</style>
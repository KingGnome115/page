<template lang="">
    <div class="container">
        <div class="row mt-3">
            <header class="row text-align" >
                <h2>Lista de Protocolos</h2>
            </header>
            
            <form class="row">
                <div class="control col-12 col-md-8 mt-3 mb-3">
                    <input v-model="nombreProtocolo" type="text" autocomplete="off" v-bind="state" @input="filterStates" class="form-control valid barraBusqueda" placeholder="Nombre del protocolo" v-on:keyup.enter="buscarData">
                </div>

                <div class="control col-12 col-md-4 mt-3 mb-3">
                        <button class="btn btn-primary"  v-on:click="buscarData">Buscar</button>
                </div>

                <div>
                    <ul class="list">
                        <li v-for="(filt, index) in filteredStates" :key="index" @click="buscaData(filt)"> {{filt}} </li>
                    </ul>
                </div>
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
                state:'',
                states: [] as string[],
                filteredStates: [] as string[],
            }
        },
        methods:{
            async cargarProtocolos(){
                const res = await consultarProtocolos()
                this.protocolos = res.data
                this.protocolos.forEach(element => {
                    this.states.push(element.nomProtocolo)
                });
            },
            async buscarData(){
                this.protocolos.forEach(protocolo => {
                    let nomPro = protocolo.nomProtocolo.toLowerCase()
                    if(nomPro.indexOf(this.nombreProtocolo.toLowerCase()) > -1){
                        this.$router.push(`/protocolos/${protocolo._id}`)
                    }
                })
            },
            async buscaData(nom : string){
                this.protocolos.forEach(protocolo => {
                    let nomPro = protocolo.nomProtocolo.toLowerCase()
                    if(nomPro.indexOf(nom.toLowerCase()) > -1){
                        this.$router.push(`/protocolos/${protocolo._id}`)
                    }
                })
            },
            filterStates(){
                this.filteredStates = this.states.filter(state => {
                    return state.toLowerCase().startsWith(this.nombreProtocolo.toLowerCase())
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
<template lang="">
    <div class="container">
        <div class="row mt-3">
            <header class="row text-align" >
                <h2>Lista de Protocolos</h2>
            </header>
            
            <form class="row">
                <div class="control col-12 col-md-8 mt-3 mb-3">
                    <input v-model="nombreProtocolo" v-on:keypress="recon" type="text" autocomplete="off" v-bind="state" @input="filterStates" class="form-control valid barraBusqueda" placeholder="Nombre del protocolo">
                </div>

                <div class="control col-12 col-md-4 mt-3 mb-3">
                        <button class="btn btn-primary">Buscar</button>
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
    import { consultarProtocolosRex } from '../services/ProtocoloServices';
    import { consultarProtocoloNom } from '../services/ProtocoloServices';
    import { Protocolo } from '../interfaces/Protocolos';

    export default defineComponent({
        data(){
            return{
                protocolos: [] as string[],
                nombreProtocolo: '',
                state:'',
                states: [] as string[],
                filteredStates: [] as string[],
                protocoloEnc : {} as Protocolo
            }
        },
        methods:{
            async cargarProtocolos(){
                const res = await consultarProtocolosRex('a')
                if (typeof res.data !== 'undefined'){
                    this.protocolos = res.data as string[]
                }

                this.protocolos.forEach(element => {
                    this.states.push(element)
                });
            },
            async buscaData(nom : string){
                let protocoloB = '';
                this.protocolos.forEach(protocolo => {
                    let nomPro = protocolo.toLowerCase()
                    if(nomPro.toLowerCase() == nom.toLowerCase()){
                        protocoloB = protocolo;
                    }
                })
                if(protocoloB !== ''){
                    let protocoloE = await consultarProtocoloNom(protocoloB)
                    this.protocoloEnc = protocoloE.data as Protocolo
                    this.$router.push(`/protocolos/${this.protocoloEnc._id}`)
                }
            },
            filterStates(){
                if(this.nombreProtocolo.length == 0){
                    this.filteredStates = []
                }else{
                    this.filteredStates = this.states.filter(state => {
                    return state.toLowerCase().includes(this.nombreProtocolo.toLowerCase())
                    })
                }
            },
            async recon(){
                if(this.nombreProtocolo.length != 0){
                    const res = await consultarProtocolosRex(this.nombreProtocolo)
                    if (typeof res.data !== 'undefined'){
                        this.protocolos = res.data as string[]
                    }

                    this.protocolos.forEach(element => {
                        if(!this.states.includes(element)){
                            this.states.push(element)
                        }
                    });
                    this.filterStates()
                }
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
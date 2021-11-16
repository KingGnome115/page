<template lang="">
    <div class="Contenido">
        <h1>Lista de protocolos</h1>
        <ul>
            <li v-for="(protocolo, index) in protocolos" :key="index" @click="this.$router.push(`/protocolos/${protocolo._id}`)">
                {{protocolo.nomProtocolo}} {{protocolo.numeroProtocolo}} {{protocolo.nomeclatura}} <hr>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue'
    import { consultarProtocolos } from '../services/ProtocoloServices'
    import { Protocolo } from '../interfaces/Protocolos';

    export default defineComponent({
        data(){
            return{
                protocolos: [] as Protocolo[]
            }
        },
        methods:{
            async cargarProtocolos(){
                const res = await consultarProtocolos()
                this.protocolos = res.data
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
</style>
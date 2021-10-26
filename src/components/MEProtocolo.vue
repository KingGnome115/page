<template>
    <div>
        <h1>Detalles </h1>
        <form @submit.prevent="handleUpdate()">
            <input type="text" v-model="protocoloActual.titulo">
            <textarea rows="3" v-model="protocoloActual.descripcion"></textarea>
            <button type="">Actualizar</button>

        </form>
        <button @click="handleDelete()">Eliminar</button>
    </div>
</template>

<script lang="ts">
    //import {Protocolo} from "@/interfaces/Protocolo"
    import{consultarProtocolo, modificarProtocolo, eliminarProtocolo} from "@/services/ProtocoloServices";
    import { defineComponent } from '@vue/runtime-core';

    export default defineComponent({
        data() {
            return{
                protocoloActual:{} as Protocolo
            }
            
        },
        methods:{
            async buscarProtocolo(id: string){
                const res = await consultarProtocolo(id)
                this.protocoloActual = res.data
            },
            async handleUpdate(){
                modificarProtocolo(this.protocoloActual._id, this.protocoloActual)
                this.$router.push("/")
            },
            async handleDelete(){
                eliminarProtocolo(this.protocoloActual._id)
                this.$router.push("/")
            }

        },
        mounted(){
            if(typeof this.$route.params.id === 'string'){
                this.buscarProtocolo(this.$route.params.id)
            }
        }
    })
</script>

<style scoped>

</style>

<template lang="">
    <div>
        <h1>Detalles de tareas</h1>
    </div>
</template>
<script lang="ts">
    import { getTask } from "@/services/TaskServices";
    import { defineComponent } from "@vue/runtime-core";    
    export default defineComponent({
        methods:{
            async loadTask(id: string){
               const res = await getTask(id)
               console.log(res)
            }
        },
        mounted(){
            if(typeof this.$route.params.id === 'string'){
                this.loadTask(this.$route.params.id)
            }
        }
    })
</script>
<style scoped>
    
</style>
<template lang="">
    <div>
        <h1>Detalles de tareas</h1>
        <form @submit.prevent="handleUpdate()">
            <input type="text" v-model="currentTask.titulo">
            <textarea rows="3" v-model="currentTask.descripcion"></textarea>
            <button type="">Actualizar</button>
        </form>
        <button @click="handleDelete()">Eliminar</button>
    </div>
</template>
<script lang="ts">
    import { Task } from "@/interfaces/Task";
    import { getTask, updateTask, deleteTask } from "@/services/TaskServices";
    import { defineComponent } from "@vue/runtime-core";    
    export default defineComponent({
        data(){
            return{
                currentTask: {} as Task
            }
        },
        methods:{
            async loadTask(id: string){
               const res = await getTask(id)
               this.currentTask = res.data
            },
            async handleUpdate(){
                updateTask(this.currentTask._id,this.currentTask)
                this.$router.push("/")
            },
            async handleDelete(){
                deleteTask(this.currentTask._id)
                this.$router.push("/")
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
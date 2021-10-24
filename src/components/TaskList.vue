<template lang="">
    <div>
        <h1>Lista tareas</h1>
        <ul>
            <li v-for="(task, index) in tasks" :key="index" @click="this.$router.push(`/tasks/${task._id}`)">
                {{task.titulo}}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { getTasks } from '@/services/TaskServices'
    import {defineComponent} from 'vue'
    import { Task } from '../interfaces/Task';

    export default defineComponent({
        data(){
            return{
                tasks: [] as Task[]
            }
        },
        methods:{
            async loadTask(){
                const res = await getTasks()
                this.tasks = res.data
            }
        },
        mounted(){
            this.loadTask()
        }
    })

</script>

<style scoped>
    
</style>
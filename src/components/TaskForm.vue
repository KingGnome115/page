<template lang="">
    <div>
        <form @submit.prevent="saveTask()">
            <input type="text" placeholder="Escribe un titulo" v-model="task.titulo">
         <textarea rows="3" placeholder="Escribe una descripcion" v-model="task.descripcion" ></textarea>
          <button  type="">Guardar</button>
        </form>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue'
    import {Task} from '@/interfaces/Task'
    import {createTask} from '@/services/TaskServices'

    export default defineComponent({
        data(){
            return {
                task:{} as Task
            }
        },
        methods: {
            async saveTask(){
                const res = await createTask(this.task)
                console.log(res)
            }
        }
    })
</script>

<style scoped>
    
</style>
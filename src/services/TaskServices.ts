import axios from './axios'
import { AxiosResponse } from 'axios';
import { Task } from '@/interfaces/Task'

export const getTasks = async(): Promise<AxiosResponse<Task[]>> => await axios.get('/tasks')

export const getTask = async(id: string): Promise<AxiosResponse<Task>> => await axios.get('/task/'+id)

export const createTask = async(task: Task) => await axios.post('/tasks',task);

export const updateTask = async(id: string, task:Task) => await axios.put("/tasks/"+id,task)

export const deleteTask = async(id: string): Promise<AxiosResponse<Task>> => await axios.delete('/tasks/'+id)
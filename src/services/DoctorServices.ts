import axios from './axios'
import { AxiosResponse } from 'axios';
import { Doctor } from '@/interfaces/Doctor'

export const consultarDoctoresRex = async(rex: string): Promise<AxiosResponse<string[]>> => await axios.get(`/doctores/${rex}`)

export const consultarDoctorNom = async(nom: string): Promise<AxiosResponse<Doctor>> => await axios.get(`/doctor/${nom}`)

//actualizar pacientes que es un arreglo con id de tipo string
export const actualizarPacientesDoc = async(id: string, Pacientes: string[]): Promise<AxiosResponse<Doctor>> => await axios.put(`/doctorPa/${id}`,Pacientes)
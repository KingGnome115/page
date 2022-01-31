import axios from './axios'
import { AxiosResponse } from 'axios';
import {Citas} from '@/interfaces/Citas'

export const agregarCitas = async(citas: Citas): Promise<AxiosResponse<Citas>> => await axios.post('/citas',citas)

export const obtenerCitasProtocolo = async(id: string): Promise<AxiosResponse<Citas[]>> => await axios.get(`/citas_protocolo/${id}`)

export const obtenerCitasPaciente = async(id: string): Promise<AxiosResponse<Citas[]>> => await axios.get(`/citas_paciente/${id}`)

export const eliminarCitas = async(id: string): Promise<AxiosResponse<Citas>> => await axios.delete(`/citas/${id}`)

export const modificarCitas = async(id: string, citas: Citas): Promise<AxiosResponse<Citas>> => await axios.put(`/citas/${id}`,citas)
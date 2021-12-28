import axios from './axios'
import { AxiosResponse } from 'axios';
import {Citas} from '@/interfaces/Citas'

export const agregarCitas = async(citas: Citas): Promise<AxiosResponse<Citas>> => await axios.post('/citas',citas)

export const obtenerCitasProtocolo = async(id: string): Promise<AxiosResponse<Citas[]>> => await axios.get(`/citas_protocolo/${id}`)
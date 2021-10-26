import axios from './axios';
import { AxiosResponse } from 'axios';
//import { Protocolo } from '@/interfaces/Protocolo';

export const consultarProtocolo = async(): Promise<AxiosResponse<Protocolo[]>>=> await axios.get('/protocolo')

export const consultarProtocolo = async(id: string): Promise<AxiosResponse<Protocolo>> => await axios.get('/protocolo/'+id)

export const agregarProtocolo = async(protocolo: Protocolo) => axios.post('protocolo',protocolo);

export const modificarProtocolo = async(id: string, protocolo:Protocolo) => await axios.put("/protocolo/"+id,protocolo)

export const eliminarProtocolo = async(id: string): Promise<AxiosResponse<Protocolo>> => await axios.delete('/protocolo/'+id)
import axios from './axios';
import { AxiosResponse } from 'axios';
import { Protocolo } from '@/interfaces/Protocolos';

export const consultarProtocolos = async(): Promise<AxiosResponse<Protocolo[]>>=> await axios.get('/protocolos')

export const consultarProtocolo = async(id: string): Promise<AxiosResponse<Protocolo>> => await axios.get('/protocolo/'+id)

export const agregarProtocolo = async(protocolo: Protocolo) => axios.post('/protocolos',protocolo);

export const modificarProtocolo = async(id: string, protocolo:Protocolo) => await axios.put("/protocolos/"+id,protocolo)

export const eliminarProtocolo = async(id: string): Promise<AxiosResponse<Protocolo>> => await axios.delete('/protocolos/'+id)
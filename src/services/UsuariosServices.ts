import axios from './axios'
import { AxiosResponse } from 'axios';
import { Usuario } from '@/interfaces/Usuarios'

export const consultarUsuariosP = async(): Promise<AxiosResponse<Usuario[]>> => await axios.get('/usuariosP')

export const registrarUsuario = async(usuario: Usuario): Promise<AxiosResponse<Usuario>> => await axios.post('/usuarios', usuario)

export const eliminarUP = async(id: string): Promise<AxiosResponse<Usuario>> => await axios.delete(`/usuariosP/${id}`)

export const aceptarUP = async(usuario: Usuario): Promise<AxiosResponse<Usuario>> => await axios.post(`/usuariosN`, usuario)
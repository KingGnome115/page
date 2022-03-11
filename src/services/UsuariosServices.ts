import axios from './axios'
import { AxiosResponse } from 'axios';
import { Usuario } from '@/interfaces/Usuarios'

export const consultarUsuariosP = async(): Promise<AxiosResponse<Usuario[]>> => await axios.get('/usuariosP')

export const registrarUsuario = async(usuario: Usuario): Promise<AxiosResponse<Usuario>> => await axios.post('/usuarios', usuario)

export const eliminarUP = async(id: string): Promise<AxiosResponse<Usuario>> => await axios.delete(`/usuariosP/${id}`)

export const aceptarUP = async(usuario: Usuario): Promise<AxiosResponse<Usuario>> => await axios.post(`/usuariosN`, usuario)

export const login = async(email: string, pass: string): Promise<AxiosResponse<Usuario>> => await axios.post(`/login`, {email, pass})

export const consultarPreg = async(email: string): Promise<AxiosResponse<string>> => await axios.post('/emailP', {email})

export const conRespuesta = async(email: string, respuesta: string): Promise<AxiosResponse<Usuario>> => await axios.post('/respuesta', {email, respuesta})

export const actualizarContra = async(email: string, password: string): Promise<AxiosResponse<Usuario>> => await axios.put('/cambiarContra', {email, password})
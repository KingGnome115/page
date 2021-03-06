import axios from './axios'
import { AxiosResponse } from 'axios';
import { Paciente } from '@/interfaces/Paciente'

export const consultarPacientes = async(): Promise<AxiosResponse<Paciente[]>> => await axios.get('/pacientes')

export const consultarPaciente = async(id: string): Promise<AxiosResponse<Paciente>> => await axios.get(`/paciente/${id}`)

export const consultarPacientesRex = async(rex: string): Promise<AxiosResponse<string[]>> => await axios.get(`/pacientess/${rex}`)

export const consultarPacientesRexNa = async(rex: string): Promise<AxiosResponse<string[]>> => await axios.get(`/pacientessna/${rex}`)

export const agregarPaciente = async(paciente: Paciente) => await axios.post('/pacientes',paciente);

export const modificarPaciente = async(id: string, paciente:Paciente): Promise<AxiosResponse<Paciente>> => await axios.put(`/pacientes/${id}`, paciente)

export const eliminarPaciente = async(id: string): Promise<AxiosResponse<Paciente>> => await axios.delete(`/pacientes/${id}`)

export const consultarPacienteNom = async(nomPila: string, primApellido: string, segApellido: string): Promise<AxiosResponse<Paciente>> => await axios.get(`/paciente/${nomPila}/${primApellido}/${segApellido}`)

export const consultarPacientesNa = async(): Promise<AxiosResponse<string[]>> => await axios.get('/pacientesna')
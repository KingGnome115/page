import axios from './axios'
import { AxiosResponse } from 'axios';
import {Citas} from '@/interfaces/Citas'

export const agregarCitas = async(citas: Citas) => await axios.post('/citas',citas);
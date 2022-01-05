import {Visitas} from '../interfaces/Visitas'

export interface Protocolo{
    nomProtocolo:string;
    numeroVisitas:number;
    visitas:Visitas[];
    color:string;
    _id:string;
}
import {Visitas} from '../interfaces/Visitas'

export interface Protocolo{
    nomProtocolo:string;
    numeroProtocolo:number;
    numeroVisitas:number;
    visitas:Visitas[];
    color:string;
    _id:string;
}
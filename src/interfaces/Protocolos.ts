import {Visitas} from '../interfaces/visitas'

export interface Protocolo{
    nomProtocolo:string;
    numeroProtocolo:number;
    numeroVisitas:number;
    visitas:Visitas[];
    color:string;
    _id:string;
}
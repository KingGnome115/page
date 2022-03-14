export interface Doctor{
    id_Usuario: string;
    nombre: string;
    Protocolos:[{id:string}];
    Pacientes:[{id:string}];
}
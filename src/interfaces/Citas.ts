export interface Citas{
    _id: string;
    idPaciente: string;
    idProtocolo: string;
    visitaZero: string;
    visitas:[{citaFecha: string}];
}
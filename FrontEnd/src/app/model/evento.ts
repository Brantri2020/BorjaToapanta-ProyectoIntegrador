export class Evento {
    id?: number;
    nombreEvento: string;
    tipoEvento: string;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    descripcion: string;
    constructor(nombreEvento: string,
        tipoEvento: string,
        fecha: string,
        horaInicio: string,
        horaFin: string,
        descripcion: string,
       ) {
            this.nombreEvento=nombreEvento;
            this.tipoEvento=tipoEvento;
            this.fecha=fecha;
            this.horaInicio=horaInicio;
            this.horaFin=horaFin;
            this.descripcion= descripcion;                   
    }
}
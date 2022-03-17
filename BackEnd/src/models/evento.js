class Evento {
    constructor(id, 
        nombreEvento, 
        tipoEvento,
        fecha,
        horaInicio,
        horaFin,
        descripcion) {
            this.id = id;
            this.nombreEvento=nombreEvento;
            this.tipoEvento=tipoEvento;
            this.fecha=fecha;
            this.horaInicio=horaInicio;
            this.horaFin=horaFin;
            this.descripcion= descripcion;                                  
    }
}
module.exports = Evento;
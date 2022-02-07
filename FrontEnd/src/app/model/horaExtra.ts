export class HoraExtra {
    id?: number;
    cedulaEmpleado: string;
    nombreEmpleado: string;
    cantidadHoras: string;
    valorXHora: string;
    valorFinalHoras: string;
    fechaHoraExtra: string;

    constructor(cedulaEmpleado: string,
        nombreEmpleado: string,
        cantidadHoras: string,
        valorXHora: string,
        valorFinalHoras: string,
        fechaHoraExtra: string) {
        this.cedulaEmpleado = cedulaEmpleado;
        this.nombreEmpleado = nombreEmpleado;
        this.cantidadHoras = cantidadHoras;
        this.valorXHora = valorXHora;
        this.valorFinalHoras = valorFinalHoras;
        this.fechaHoraExtra = fechaHoraExtra;
    }
}
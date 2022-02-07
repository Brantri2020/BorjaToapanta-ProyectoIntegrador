export class HoraExtra {
    id?: number;
    cedulaEmpleado: string;
    cantidadHoras: string;
    valorXHora: string;
    valorFinalHoras: string;
    fechaHoraExtra: string;

    constructor(cedulaEmpleado: string,
        cantidadHoras: string,
        valorXHora: string,
        valorFinalHoras: string,
        fechaHoraExtra: string) {
        this.cedulaEmpleado = cedulaEmpleado;
        this.cantidadHoras = cantidadHoras;
        this.valorXHora = valorXHora;
        this.valorFinalHoras = valorFinalHoras;
        this.fechaHoraExtra = fechaHoraExtra;
    }
}
export class Anticipo2 {
    id?: number;
    cedulaEmpleado: string;
    nombreEmpleado: string;
    valorAnticipo: string;
    fechaAnticipo: string;

    constructor(cedulaEmpleado: string,
        nombreEmpleado: string,
        valorAnticipo: string,
        fechaAnticipo: string) {
        this.cedulaEmpleado = cedulaEmpleado;
        this.nombreEmpleado = nombreEmpleado;
        this.valorAnticipo = valorAnticipo;
        this.fechaAnticipo = fechaAnticipo;
    }
}
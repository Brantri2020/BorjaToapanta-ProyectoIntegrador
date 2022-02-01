export class Anticipo {
    id?: number;
    cedulaEmpleado: string;
    valorAnticipo: string;
    fechaAnticipo: string;

    constructor(cedulaEmpleado: string,
        valorAnticipo: string,
        fechaAnticipo: string) {
        this.cedulaEmpleado = cedulaEmpleado;
        this.valorAnticipo = valorAnticipo;
        this.fechaAnticipo = fechaAnticipo;
    }
}
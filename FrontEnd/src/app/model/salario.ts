export class Salario {
    id?: number;
    cargo: string;
    salario: string;
    

    constructor(cargo: string,
        salario: string) {
        this.cargo = cargo;
        this.salario = salario;
    }
}
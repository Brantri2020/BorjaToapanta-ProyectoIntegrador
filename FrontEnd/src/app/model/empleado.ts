export class Empleado {
    id?: number;
    cedula: string;
    nombre: string;
    cargo: string;
    salario: string;
    numeroCuenta: string;
    tipoCuenta: string;
    institucionFinanciera: string;

    constructor(cedula: string,
        nombre: string,
        cargo: string,
        salario: string,
        numeroCuenta: string,
        tipoCuenta: string,
        institucionFinanciera: string) {
        this.cedula = cedula;
        this.nombre = nombre;
        this.cargo = cargo;
        this.salario = salario;
        this.numeroCuenta = numeroCuenta;
        this.tipoCuenta = tipoCuenta;
        this.institucionFinanciera = institucionFinanciera;
    }
}
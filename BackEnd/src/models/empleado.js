class Empleado {
    constructor(id, cedula, nombre, cargo, salario, numeroCuenta, tipoCuenta, institucionFinanciera) {
        this.id = id;
        this.cedula = cedula;
        this.nombre = nombre;
        this.cargo = cargo;
        this.salario = salario;
        this.numeroCuenta = numeroCuenta;
        this.tipoCuenta = tipoCuenta;
        this.institucionFinanciera = institucionFinanciera;
    }
}
module.exports = Empleado;
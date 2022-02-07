class NominaPagoEmpleado {
    constructor(cedula,
        nomina,
        cargo,
        salario,
        numeroHorasExtras,
        valorHorasExtras,
        sePagaFondosReserva,
        fondosReserva,
        totalIngresos,
        iess,
        anticipo,
        prestamiIess,
        totalEgreso,
        liquidoRecibir,
        numeroCuenta,
        tipoCuenta,
        institucionFinanciera) {            
            this.cedula= cedula;
            this.nomina=nomina;
            this.salario=salario;
            this.cargo=cargo;
            this.numeroHorasExtras=numeroHorasExtras;
            this.valorHorasExtras=valorHorasExtras;
            this.sePagaFondosReserva=sePagaFondosReserva;
            this.fondosReserva=fondosReserva;
            this.totalIngresos=totalIngresos;
            this.iess=iess;
            this.anticipo=anticipo;
            this.prestamiIess=prestamiIess;
            this.totalEgreso=totalEgreso;
            this.liquidoRecibir=liquidoRecibir;
            this.numeroCuenta=numeroCuenta;
            this.tipoCuenta=tipoCuenta;
            this.institucionFinanciera=institucionFinanciera;            
    }
}

module.exports = NominaPagoEmpleado;
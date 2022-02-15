 class NominaPago {
    constructor(id, 
        cedula,
        nomina,
        cargo,
        salario,
        numeroHorasExtras,
        valorHorasExtras,
        sePagaFondosReserva,
        fondosReserva,
        porcentajeFondo,
        totalIngresos,
        iess,
        porcentajeIess,
        anticipo,
        prestamoIess,
        totalEgreso,
        liquidoRecibir,
        numeroCuenta,
        tipoCuenta,
        institucionFinanciera) {
            this.id=id;
            this.cedula= cedula;
            this.nomina=nomina;
            this.salario=salario;
            this.cargo=cargo;
            this.numeroHorasExtras=numeroHorasExtras;
            this.valorHorasExtras=valorHorasExtras;
            this.sePagaFondosReserva=sePagaFondosReserva;
            this.fondosReserva=fondosReserva;
            this.porcentajeFondo=porcentajeFondo,
            this.totalIngresos=totalIngresos;
            this.iess=iess;
            this.porcentajeIess=porcentajeIess,
            this.anticipo=anticipo;
            this.prestamoIess=prestamoIess;
            this.totalEgreso=totalEgreso;
            this.liquidoRecibir=liquidoRecibir;
            this.numeroCuenta=numeroCuenta;
            this.tipoCuenta=tipoCuenta;
            this.institucionFinanciera=institucionFinanciera;            
    }
}

module.exports = NominaPago;
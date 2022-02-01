 class NominaPago {
    constructor(id, 
        cedula,
        nomina,
        cargo,
        salario,
        numHorasExtras,
        valorHorasExtras,
        sePagaFondosReserva,
        fondosReserva,
        totalIngresos,
        iess,
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
            this.numHorasExtras=numHorasExtras;
            this.valorHorasExtras=valorHorasExtras;
            this.sePagaFondosReserva=sePagaFondosReserva;
            this.fondosReserva=fondosReserva;
            this.totalIngresos=totalIngresos;
            this.iess=iess;
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
export class NominaPago {
    id?: number;
    cedula: string;
    nomina: string;
    cargo: string;
    salario: string;    
    numeroHorasExtras: string;
    valorHorasExtras: string;
    sePagaFondosReserva: string;
    fondosReserva: string;
    porcentajeFondo: string;
    totalIngresos: string;
    iess: string;
    porcentajeIess: string;
    anticipo: string;
    prestamoIess: string;
    totalEgreso: string;
    liquidoRecibir: string;
    numeroCuenta: string;
    tipoCuenta: string;
    institucionFinanciera: string;


    constructor(cedula: string,
        nomina: string,
        cargo: string,
        salario: string,        
        numeroHorasExtras:string,
        valorHorasExtras: string,
        sePagaFondosReserva: string,
        fondosReserva: string,
        porcentajeFondo:string,
        totalIngresos: string,
        iess: string,
        porcentajeIess: string,
        anticipo: string,
        prestamoIess: string,
        totalEgreso: string,
        liquidoRecibir: string,
        numeroCuenta: string,
        tipoCuenta: string,
        institucionFinanciera: string) {
            this.cedula= cedula;
            this.nomina=nomina;
            this.salario=salario;
            this.cargo=cargo;            
            this.numeroHorasExtras=numeroHorasExtras;
            this.valorHorasExtras=valorHorasExtras;
            this.sePagaFondosReserva=sePagaFondosReserva;
            this.fondosReserva=fondosReserva;
            this.fondosReserva=fondosReserva;
            this.porcentajeFondo=porcentajeFondo;
            this.totalIngresos=totalIngresos;
            this.iess=iess;
            this.porcentajeIess=porcentajeIess;
            this.anticipo=anticipo;
            this.prestamoIess=prestamoIess;
            this.totalEgreso=totalEgreso;
            this.liquidoRecibir=liquidoRecibir;
            this.numeroCuenta=numeroCuenta;
            this.tipoCuenta=tipoCuenta;
            this.institucionFinanciera=institucionFinanciera;            
    }
}
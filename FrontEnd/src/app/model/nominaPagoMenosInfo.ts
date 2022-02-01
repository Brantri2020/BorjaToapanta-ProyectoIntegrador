export class NominaPagoMenosInfo {
    id?: number;
    cedula: string;
    nomina: string;
    cargo: string;
    salario: string;    
    numHorasExtras: string;
    valorHorasExtras: string;
    sePagaFondosReserva: string;
    fondosReserva: string;
    totalIngresos: string;
    iess: string;
    anticipo: string;
    prestamoIess: string;
    totalEgreso: string;
    liquidoRecibir: string;    


    constructor(cedula: string,
        nomina: string,
        cargo: string,
        salario: string,    
        numHorasExtras: string,    
        valorHorasExtras: string,
        sePagaFondosReserva: string,
        fondosReserva: string,
        totalIngresos: string,
        iess: string,
        anticipo: string,
        prestamoIess: string,
        totalEgreso: string,
        liquidoRecibir: string) {
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
    }
}
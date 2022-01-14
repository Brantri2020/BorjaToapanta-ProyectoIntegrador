export class Proveedor {
    id?: number;
    ruc: string;
    nombre: string;
    cuenta: string;
    banco: string;
    tipoCuenta: string;
    telefonoCelular: string;
    telefonoConvencional: string;
    correo: string;
    


    constructor(ruc: string,
        nombre: string,
        cuenta: string,
        banco: string,
        tipoCuenta: string,
        telefonoCelular: string,
        telefonoConvencional: string,
        correo: string) {
        this.ruc = ruc;
        this.nombre = nombre;
        this.cuenta = cuenta;
        this.banco = banco;
        this.tipoCuenta = tipoCuenta;
        this.telefonoCelular = telefonoCelular;
        this.telefonoConvencional = telefonoConvencional;
        this.correo = correo;        
    }
}
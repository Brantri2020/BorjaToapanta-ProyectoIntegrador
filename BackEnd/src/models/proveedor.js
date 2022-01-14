class Proveedor {
    constructor(id, ruc, nombre, cuenta, banco, tipoCuenta, telefonoCelular, telefonoConvencional, correo) {
            this.id = id;
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
module.exports = Proveedor;
export class Usuario {
    _id?: number;
    nombre: string;
    apellido: string;
    cedula: string;
    direccion: string;
    correoUsuario: string;
    password: string;
    password2: string;



    constructor(nombre: string,
        apellido: string,
        cedula: string,
        direccion: string,
        correoUsuario: string,
        password: string,
        password2: string
        ) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.cedula = cedula;
        this.direccion = direccion;
        this.correoUsuario = correoUsuario;    
        this.password = password;
        this.password2 = password2;
     
    }
}
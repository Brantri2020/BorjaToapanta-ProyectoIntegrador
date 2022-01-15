import { Host, Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../model/usuario';
import { SignInComponent } from '../components/usuarios/sign-in/sign-in.component';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  emails = [];

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // Servicio NgZone para eliminar la advertencia de alcance externo
    private _usuarioService: UsuarioService,
    //public signIn: SignInComponent,
    //@Host() private signIn: SignInComponent



  ) {


    /* Guardar los datos del usuario en el almacenamiento local 
    cuando se inicia sesión y configurar nulo cuando se cierra la sesión */
    this.afAuth.authState.subscribe((user: any) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', null!);
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    })
  }

  // inicio sesion
  SignIn(email: any, pass: any) {
    return this.afAuth.auth.signInWithEmailAndPassword(email.value, pass.value)
      .then((result: { user: any; }) => {
        this.ngZone.run(() => {
          this.router.navigate(['main']);
        });
        this.SetUserData(result.user);
      }).catch((error: { message: any; }) => {
        
        //window.alert(error.message);
        if (error.message == "The email address is badly formatted.") {
          window.alert("El usuario no existe");
          window.location.reload();
          // this.Limpiarcampos();
        } else if (error.message == "The password is invalid or the user does not have a password.") {
          window.alert("La contraseña es incorrecta");
          window.location.reload();
        } else if (error.message == "The email address is badly formatted.") {
          window.alert("El correo esta en mal formato o vacío");
          window.location.reload();
        } else if (error.message == "The password is invalid or the user does not have a password.") {
          window.alert("La contraseña esta en mal formato o vacía");
          window.location.reload();
        } else {
          window.alert(error.message);
          window.location.reload();
        }
        //window.alert(error.message)
      })
  }

  eliminarCampos(etiqueta1: any, etiqueta2: any) {

    let elemento1: any = document.getElementById('etiqueta1');
    let elemento2: any = document.getElementById('etiqueta2');

    elemento1 = "";
    elemento2 = "";

  }

  MostrarMensaje(mensaje: string) {
    return mensaje;
  }



  
  ValidadorCedula(cedula:string){
    
    
       
        var bandera= true;
         
        

        //Preguntamos si la cedula consta de 10 digitos
        if(cedula.toString().length == 10){
           
           //Obtenemos el digito de la region que sonlos dos primeros digitos
           var digito_region = parseInt(cedula.toString().substring(0,2));
           
           //Pregunto si la region existe ecuador se divide en 24 regiones
           if( digito_region >= 1 && digito_region <=24 ){
             
             // Extraigo el ultimo digito
             var ultimo_digito   = parseInt(cedula.toString().substring(9,10));
   
             //Agrupo todos los pares y los sumo
             var pares = parseInt(cedula.toString().substring(1,2)) + parseInt(cedula.toString().substring(3,4)) + parseInt(cedula.toString().substring(5,6)) + parseInt(cedula.toString().substring(7,8));
   
             //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
             var numero1 = parseInt(cedula.toString().substring(0,1));
             var numero1 = (numero1 * 2);
             if( numero1 > 9 ){ var numero1 = (numero1 - 9); }
   
             var numero3 = parseInt(cedula.substring(2,3));
             var numero3 = (numero3 * 2);
             if( numero3 > 9 ){ var numero3 = (numero3 - 9); }
   
             var numero5 = parseInt(cedula.substring(4,5));
             var numero5 = (numero5 * 2);
             if( numero5 > 9 ){ var numero5 = (numero5 - 9); }
   
             var numero7 = parseInt(cedula.substring(6,7));
             var numero7 = (numero7 * 2);
             if( numero7 > 9 ){ var numero7 = (numero7 - 9); }
   
             var numero9 = parseInt(cedula.substring(8,9));
             var numero9 = (numero9 * 2);
             if( numero9 > 9 ){ var numero9 = (numero9 - 9); }
   
             var impares = numero1 + numero3 + numero5 + numero7 + numero9;
   
             //Suma total
             var suma_total = (pares + impares);
   
             //extraemos el primero digito
             var primer_digito_suma = String(suma_total).substring(0,1);
   
             //Obtenemos la decena inmediata
             var decena = (parseInt(primer_digito_suma) + 1)  * 10;
   
             //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
             var digito_validador = decena - suma_total;
   
             //Si el digito validador es = a 10 toma el valor de 0
             if(digito_validador == 10)
               var digito_validador = 0;
   
             //Validamos que el digito validador sea igual al de la cedula
             if(digito_validador == ultimo_digito){
               bandera=true;
             }else{
               bandera=false;
             }
             
           }else{
             // imprimimos en consola si la region no pertenece
             console.log('Esta cedula no pertenece a ninguna region');
           }
        }  
     
       
       
      

        // set error on matchingControl if validation fails
        if (!bandera) {
            return false
        } else {
            return true
        }
    }
    
    
  



  // Sign up with email/pass
  SignUp(correo: string, pass: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(correo, pass)
      .then((result: { user: any; }) => {
        /* Llame a la función SendVerificaitonMail () cuando un nuevo usuario se registre y devuelva la promesa */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error: { message: any; }) => {
        window.alert(error.message)
      })
  }

  // Enviar verificación por correo electrónico cuando se registre un nuevo usuario
  SendVerificationMail() {
    return this.afAuth.auth.currentUser!.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
  }

  // Reseteo contraseña
  Forgotpassword(passResetEmail: any) {
    return this.afAuth.auth.sendPasswordResetEmail(passResetEmail)
      .then(() => {
        window.alert('correo electrónico para reestablecer su contraseña enviado, verifique su bandeja de entrada.');
      }).catch((error: any) => {
        window.alert(error)
      })
  }

  // Devuelve verdadero cuando el usuario inicia sesión y se verifica el correo electrónico
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user !== null && user.emailVerified !== false) ? true : false;
  }




  // Sign in with Google
  GoogleAuth() {

    return this.AuthLogin(new auth.GoogleAuthProvider());
  }


  VerificarDatos(email: string) {
    //quiero que verifique los emails registrados, si no lo esta el de google llene el formulario menos el correo y pass
    var bandera = false;
    this._usuarioService.obtenerEmails().subscribe(data => {
      this.emails = data;
      console.log(this.emails);
      var n = "";
      for (n in this.emails) {
        if (email == this.emails[n]) {
          bandera = true;
        }

      }

      if (!bandera) {
        this.router.navigate(['user-gmail']);
      } else {
        this.router.navigate(['main']);
      }
    }, error => {
      console.log(error);

    })




  }

  // Lógica de autenticación para ejecutar proveedores de autenticación
  AuthLogin(provider: any) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result: { user: any; }) => {
        this.ngZone.run(() => {

          //// funcion para verificar si ya esta en cloud firestore
          this.VerificarDatos(result.user.email);


        })
        this.SetUserData(result.user);
      }).catch((error: any) => {
        window.alert(error)
      })
  }


  /*
  Configurar los datos del usuario al iniciar sesión con nombre de usuario / contraseña, 
  registrarse con nombre de usuario / contraseña e iniciar sesión con el proveedor de autenticación 
  social en la base de datos de Firestore utilizando el servicio Angular Firestore + Angular Firestore Document
  */
  SetUserData(user: { uid: any; email: any; displayName: any; photoURL: any; emailVerified: any; }) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    var datos: boolean = true;
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }


    return userRef.set(userData, {
      merge: true
    })
  }

  // Cerrar Sesión 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }



}
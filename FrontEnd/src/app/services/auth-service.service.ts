import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../model/usuario';

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
    private _usuarioService: UsuarioService
    ) {    


    /* Guardar los datos del usuario en el almacenamiento local 
    cuando se inicia sesión y configurar nulo cuando se cierra la sesión */
    this.afAuth.authState.subscribe((user: any) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')|| '{}');
      } else {
        localStorage.setItem('user', null!);
        JSON.parse(localStorage.getItem('user')|| '{}');
      }
    })
  }

  // inicio sesion
  SignIn(email: any, pass: any) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then((result: { user: any; }) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error: { message: any; }) => {
        window.alert(error.message)
      })
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
    const user = JSON.parse(localStorage.getItem('user')|| '{}');
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {

        return this.AuthLogin(new auth.GoogleAuthProvider());
  }


  VerificarDatos(email:string){
    //quiero que verifique los emails registrados, si no lo esta el de google llene el formulario menos el correo y pass
     var bandera = false;
    this._usuarioService.obtenerEmails().subscribe(data => {      
      this.emails = data;
      console.log(this.emails);
      var n="";
      for (n in this.emails) {
        if (email == this.emails[n]) {
         bandera = true;
        }

       }

       if(bandera){
        window.alert("Registrado");
       }else{
         window.alert("No registrado");
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
          this.router.navigate(['dashboard']);
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
    var datos: boolean= true;
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    
    //// funcion para verificar si ya esta en cloud firestore
    this.VerificarDatos(userData.email);
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
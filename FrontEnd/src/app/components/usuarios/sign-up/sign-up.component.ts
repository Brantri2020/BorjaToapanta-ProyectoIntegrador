import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth-service.service";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch, ValidadorCedula } from 'src/app/services/must-match.validator';
import { Usuario } from 'src/app/model/usuario';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
/*import { UsuarioService } from 'src/app/services/usuario.service';

*/

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  usuarioForm: FormGroup;
  titulo = 'Crear usuario';
  id: string | null;
  mensaje: string = "";

  constructor(public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _authService: AuthService,
    private aRouter: ActivatedRoute,
    private _usuarioService: UsuarioService,) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
      direccion: ['', Validators.required],
      correoUsuario: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'password2')
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

  }

  agregarUsuario() {


    const USUARIO: Usuario = {
      nombre: this.usuarioForm.get('nombre')?.value,
      apellido: this.usuarioForm.get('apellido')?.value,
      cedula: this.usuarioForm.get('cedula')?.value,
      direccion: this.usuarioForm.get('direccion')?.value,
      correoUsuario: this.usuarioForm.get('correoUsuario')?.value,
      password: this.usuarioForm.get('password')?.value,
      password2: this.usuarioForm.get('password2')?.value      
    }

    const USUARIO2 = {
      nombre: this.usuarioForm.get('nombre')?.value,
      apellido: this.usuarioForm.get('apellido')?.value,
      cedula: this.usuarioForm.get('cedula')?.value,
      direccion: this.usuarioForm.get('direccion')?.value,
      correoUsuario: this.usuarioForm.get('correoUsuario')?.value
    }
      //agregamos usuario
      console.log(USUARIO);
      this._authService.SignUp(USUARIO.correoUsuario, USUARIO.password);

      //agregar datos del usuario
      this._usuarioService.guardarUsuario(USUARIO2).subscribe(data => {
        this.toastr.success('El usuario fue registrado con éxito!', 'Usuario Registrado!');
        this.router.navigate(['/sign-in']);
      }, error => {
        console.log(error);
        this.mensaje = error.error;
/*
        if (this.mensaje == "El usuario ya existe.") {
          var elemento1: any = document.getElementById("nombreUsuarioId");
          elemento1.className += " is-invalid";
          var elemento2: any = document.getElementById("cedulaId");
          var hasClase1 = elemento2.classList.contains('is-invalid');
          if (hasClase1) {
            elemento2.classList.remove("is-invalid");
          }
        } else if (this.mensaje == "El usuario con esta cédula ya esta registrado.") {
          var elemento2: any = document.getElementById("cedulaId");
          elemento2.className += " is-invalid";
          var elemento1: any = document.getElementById("nombreUsuarioId");
          var hasClase1 = elemento1.classList.contains('is-invalid');
          if (hasClase1) {
            elemento1.classList.remove("is-invalid");
          }
        }*/

      })
      
  }


}

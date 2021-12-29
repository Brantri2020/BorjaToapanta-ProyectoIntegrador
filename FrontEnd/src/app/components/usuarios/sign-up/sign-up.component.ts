import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth-service.service";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from 'src/app/services/must-match.validator';
import { Usuario } from 'src/app/model/usuario';
import { ToastrService } from 'ngx-toastr';
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
    private aRouter: ActivatedRoute) {
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
      //agregamos usuario
      console.log(USUARIO);
      this._authService.SignUp(USUARIO.correoUsuario, USUARIO.password);

      //agregar datos del usuario
      
      
  }


}

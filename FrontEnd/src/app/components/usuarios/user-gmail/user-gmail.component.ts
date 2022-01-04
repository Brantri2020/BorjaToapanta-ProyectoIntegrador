import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth-service.service";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from 'src/app/services/must-match.validator';
import { Usuario } from 'src/app/model/usuario';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-user-gmail',
  templateUrl: './user-gmail.component.html',
  styleUrls: ['./user-gmail.component.css']
})
export class UserGmailComponent implements OnInit {

  usuarioForm: FormGroup;
  titulo = 'Crear usuario';
  id: string | null;
  mensaje: string = "";

  constructor(public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private _usuarioService: UsuarioService,) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
      direccion: ['', Validators.required],
      correoUsuario: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')|| '{}');    
    this.usuarioForm.get('correoUsuario')?.setValue(user.email);
  }

  agregarUsuario() {

    const USUARIO2 = {
      nombre: this.usuarioForm.get('nombre')?.value,
      apellido: this.usuarioForm.get('apellido')?.value,
      cedula: this.usuarioForm.get('cedula')?.value,
      direccion: this.usuarioForm.get('direccion')?.value,
      correoUsuario: this.usuarioForm.get('correoUsuario')?.value  
    }
      

      //agregar datos del usuario
      this._usuarioService.guardarUsuario(USUARIO2).subscribe(data => {
        this.toastr.success('El usuario fue registrado con éxito!', 'Usuario Registrado!');
        this.router.navigate(['/dashboard']);
      }, error => {
        console.log(error);
        this.mensaje = error.error;


      })
      
  }


}

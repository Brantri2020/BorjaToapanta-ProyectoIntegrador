import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'http://localhost:3000/api/';
  constructor(private http: HttpClient,
    public router: Router) { }

  guardarUsuario(usuario: any): Observable<any>{
    this.router.navigate(['/sign-in']);
    return this.http.post(this.url + "usuario/", usuario);
  }

  obtenerEmails(): Observable<any>{
    return this.http.get(this.url + "emails/");
  }

  


}

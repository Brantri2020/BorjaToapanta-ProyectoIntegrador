import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) { }

  guardarUsuario(usuario: Usuario): Observable<any>{
    return this.http.post(this.url + "usuario/", usuario);
  }



}
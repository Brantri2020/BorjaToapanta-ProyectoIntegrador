import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salario } from '../model/salario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SalarioService {

  url1 = 'http://localhost:3000/api/salarios/';
  url2 = 'http://localhost:3000/api/salario/';

  constructor(private http: HttpClient,
    public router: Router) { }

  getSalarios(): Observable<any>{
    return this.http.get(this.url1);
  }

  buscarSalario(busqueda: string): Observable<any> {
    return this.http.get(this.url1 + "busqueda/"+busqueda);
  }

  eliminarSalario(id: string): Observable<any>{
    return this.http.delete(this.url1 + id);
  }

  editarSalario(id: string, salario: Salario): Observable<any>{
    return this.http.put(this.url2 + id, salario);
  }

  guardarSalario(salario: Salario): Observable<any>{
    return this.http.post(this.url2, salario);
  }

  obtenerSalario(id: string): Observable<any>{
    return this.http.get(this.url2+id);
  }

  obtenerSalarioOrdenado(filtro: string): Observable<any>{
    return this.http.get(this.url1+"salarios-ordenados/"+filtro);
  }
}

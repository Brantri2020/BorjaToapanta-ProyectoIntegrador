import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../model/empleado';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  url1 = 'http://localhost:3000/api/empleados/';
  url2 = 'http://localhost:3000/api/empleado/';
  
  constructor(private http: HttpClient,
    public router: Router) { }

  getEmpleados(): Observable<any>{
    return this.http.get(this.url1);
  }

  buscarEmpleado(busqueda: string): Observable<any> {
    return this.http.get(this.url1 + "busqueda/"+busqueda);
  }

  eliminarEmpleado(id: string): Observable<any>{
    return this.http.delete(this.url1 + id);
  }

  editarEmpleado(id: string, empleado: Empleado): Observable<any>{
    return this.http.put(this.url2 + id, empleado);
  }

  guardarEmpleado(empleado: Empleado): Observable<any>{
    return this.http.post(this.url2, empleado);
  }

  obtenerEmpleado(id: string): Observable<any>{
    return this.http.get(this.url2+id);
  }

  obtenerEmpleadoOrdenado(filtro: string): Observable<any>{
    return this.http.get(this.url1+"empleados-ordenados/"+filtro);
  }

  
}

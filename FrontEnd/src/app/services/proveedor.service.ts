import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from '../model/proveedor';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  url1 = 'http://localhost:3000/api/proveedores/';
  url2 = 'http://localhost:3000/api/proveedor/';
  //url2 = 'http://localhost:3000/api/proveedores2/';
  constructor(private http: HttpClient,
    public router: Router) { }

  getProveedores(): Observable<any>{
    return this.http.get(this.url1);
  }

  buscarProveedor(busqueda: string): Observable<any> {
    return this.http.get(this.url1 + "busqueda/"+busqueda);
  }

  eliminarProveedor(id: string): Observable<any>{
    return this.http.delete(this.url1 + id);
  }

  editarProveedor(id: string, proveedor: Proveedor): Observable<any>{
    return this.http.put(this.url2 + id, proveedor);
  }

  guardarProveedor(proveedor: Proveedor): Observable<any>{
    return this.http.post(this.url2, proveedor);
  }

  obtenerProveedor(id: string): Observable<any>{
    return this.http.get(this.url2+id);
  }

  obtenerProveedorOrdenado(filtro: string): Observable<any>{
    return this.http.get(this.url1+"proveedores-ordenados/"+filtro);
  }
}



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { nominaFecha } from '../model/nominaFecha';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NominaFechaService {

  url1 = 'http://localhost:3000/api/nominas-fecha/';
  url2 = 'http://localhost:3000/api/nomina-fecha/';
  
  constructor(private http: HttpClient,
    public router: Router) { }

    getNominasFecha(): Observable<any>{
    return this.http.get(this.url1);
  }

  buscarNominaPago(busqueda: string): Observable<any> {
    return this.http.get(this.url1 + "busqueda/"+busqueda);
  }

  eliminarNominaPago(id: string): Observable<any>{
    return this.http.delete(this.url1 + id);
  }

  editarNominaPago(id: string, nominaPago: nominaFecha): Observable<any>{
    return this.http.put(this.url2 + id, nominaPago);
  }

  guardarNominaPago(nominaPago: nominaFecha): Observable<any>{
    return this.http.post(this.url2, nominaPago);
  }

  obtenerNominaPago(id: string): Observable<any>{
    return this.http.get(this.url2+id);
  }

  obtenerNominaPagoOrdenado(filtro: string): Observable<any>{
    return this.http.get(this.url1+"nomina-pago-ordenados/"+filtro);
  }
}



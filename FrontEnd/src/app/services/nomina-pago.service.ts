import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NominaPago } from '../model/NominaPago';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NominaPagoService {

  url1 = 'http://localhost:3000/api/nominas-pago/';
  url2 = 'http://localhost:3000/api/nomina-pago/';
  
  constructor(private http: HttpClient,
    public router: Router) { }

  getNominasPago(): Observable<any>{
    return this.http.get(this.url1);
  }

  buscarNominaPago(busqueda: string): Observable<any> {
    return this.http.get(this.url1 + "busqueda/"+busqueda);
  }

  eliminarNominaPago(id: string): Observable<any>{
    return this.http.delete(this.url1 + id);
  }

  editarNominaPago(id: string, nominaPago: NominaPago): Observable<any>{
    return this.http.put(this.url2 + id, nominaPago);
  }

  guardarNominaPago(nominaPago: NominaPago): Observable<any>{
    return this.http.post(this.url2, nominaPago);
  }

  obtenerNominaPago(id: string): Observable<any>{
    return this.http.get(this.url2+id);
  }

  obtenerNominaPagoOrdenado(filtro: string): Observable<any>{
    return this.http.get(this.url1+"nomina-pago-ordenados/"+filtro);
  }
}



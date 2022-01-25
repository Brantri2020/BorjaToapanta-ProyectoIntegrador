import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NominaPago } from '../model/nominaPago';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NominaPagoService {

  url1 = 'http://localhost:3000/api/nominasPago/';
  
  
  constructor(private http: HttpClient,
    public router: Router) { }

  getNominasPago(anho:any,mes:any): Observable<any>{  
    return this.http.get(this.url1+anho+"/"+mes);
  }

  buscarNominaPago(busqueda: string, anho: string, mes: string): Observable<any> {
    return this.http.get(this.url1+anho+"/"+mes+"/busqueda/"+busqueda);
  }

  eliminarNominaPago(id: string): Observable<any>{
    return this.http.delete(this.url1 + id);
  }

  editarNominaPago(id: string, nominaPago: NominaPago): Observable<any>{
    return this.http.put(this.url1+ id, nominaPago);
  }

  guardarNominaPago(nominaPago: NominaPago): Observable<any>{
    return this.http.post(this.url1, nominaPago);
  }

  obtenerNominaPago(id: string): Observable<any>{
    return this.http.get(this.url1+id);
  }

  obtenerNominasPagoOrdenado(filtro: string,anho:string, mes:string): Observable<any>{
    return this.http.get(this.url1+anho+"/"+mes+"/nominasPago-ordenados/"+filtro);
  }
}



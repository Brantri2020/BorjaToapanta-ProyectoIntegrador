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

  getNominasPago(anho: any, mes: any): Observable<any> {
    return this.http.get(this.url1 + anho + "/" + mes);
  }

  buscarNominaPago(busqueda: string, anho: string, mes: string): Observable<any> {
    return this.http.get(this.url1 + anho + "/" + mes + "/busqueda/" + busqueda);
  }

  eliminarNominaPago(id: string): Observable<any> {
    return this.http.delete(this.url1 + id);
  }

  editarNominaPago(id: any, nominaPago: NominaPago, anho: any, mes: any): Observable<any> {
    return this.http.put(this.url1 + anho + "/" + mes + "/" + id, nominaPago);
  }

  guardarNominaPago(nominaPago: NominaPago, anho: any, mes: any, cedula: any): Observable<any> {
    return this.http.post(this.url1 + anho + "/" + mes + "/" + cedula, nominaPago);
  }

  obtenerNominaPago(id: string, anho: any, mes: any): Observable<any> {
    return this.http.get(this.url1 + anho + "/" + mes + "/" + id);
  }

  obtenerCedula(id: any): Observable<any> {
    return this.http.get(this.url1 + "ced/" + id);
  }

  obtenerNominasPagoOrdenado(filtro: string, anho: string, mes: string): Observable<any> {
    return this.http.get(this.url1 + anho + "/" + mes + "/nominasPago-ordenados/" + filtro);
  }

  comprobarIdNominaPago(id: any, anho: any, mes: any): Observable<any> {
    return this.http.get(this.url1 + "comprobar/" + anho + "/" + mes + "/" + id);
  }

  eliminarNominasPago(anho: any, mes: any): Observable<any> {
    return this.http.delete(this.url1 + "eliminar/" + anho + "/" + mes);
  }

  obtenerAnticipoPorCedula(anho: any, mes: any, cedula: any): Observable<any> {
    return this.http.get(this.url1 + "anticipo/" + anho + "/" + mes + "/" + cedula);
  }

  obtenerHorasExtrasPorCedula(anho: any, mes: any, cedula: any): Observable<any> {
    return this.http.get(this.url1 + "horasExtras/" + anho + "/" + mes + "/" + cedula);
  }

}



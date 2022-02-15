import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Porcentaje } from '../model/porcentaje';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PorcentajesService {

  url1 = 'http://localhost:3000/api/porcentajes/';


  constructor(private http: HttpClient,
    public router: Router) { }

  getPorcentajes(anho: any, mes: any): Observable<any> {
    return this.http.get(this.url1 + anho + "/" + mes);
  }

  buscarPorcentaje(busqueda: string, anho: string, mes: string): Observable<any> {
    return this.http.get(this.url1 + anho + "/" + mes + "/busqueda/" + busqueda);
  }

  eliminarPorcentaje(id: string, anho: string, mes: string): Observable<any> {
    return this.http.delete(this.url1 + anho + "/" + mes + "/" + id);
  }

  obtenerPorcentajesOrdenado(filtro: string, anho: string, mes: string): Observable<any> {
    return this.http.get(this.url1 + anho + "/" + mes + "/porcentajes-ordenados/" + filtro);
  }

  guardarPorcentaje(porcentaje: Porcentaje, anho: any, mes: any): Observable<any> {
    return this.http.post(this.url1 + anho + "/" + mes, porcentaje);
  }

  editarPorcentaje(id: any, porcentaje: Porcentaje, anho: any, mes: any): Observable<any> {
    return this.http.put(this.url1 + anho + "/" + mes + "/" + id, porcentaje);
  }
  
  obtenerPorcentaje(id: string, anho: any, mes: any): Observable<any> {
    return this.http.get(this.url1 + anho + "/" + mes + "/" + id);
  }

  /*
    
  
    guardarNominaPago(nominaPago: NominaPago, anho: any, mes: any, cedula: any): Observable<any> {
      return this.http.post(this.url1 + anho + "/" + mes + "/" + cedula, nominaPago);
    }
  
    
  
    obtenerCedula(id: any): Observable<any> {
      return this.http.get(this.url1 + "ced/" + id);
    }
  
    
  
    comprobarIdNominaPago(id: any, anho: any, mes: any): Observable<any> {
      return this.http.get(this.url1 + "comprobar/" + anho + "/" + mes + "/" + id);
    }
  
    eliminarNominasPago(anho: any, mes: any): Observable<any> {
      return this.http.delete(this.url1 + "eliminar/" + anho + "/" + mes);
    }
  
    obtenerAnticipoHorasExtrasPorCedula(anho: any, mes: any, cedula: any): Observable<any> {
      return this.http.get(this.url1 + "anticipoHorasExtras/" + anho + "/" + mes + "/" + cedula);
    }
  */

  /*
    obtenerAnticipoPorCedula(anho: any, mes: any, cedula: any): Observable<any> {
      return this.http.get(this.url1 + "anticipo/" + anho + "/" + mes + "/" + cedula);
    }
  
    obtenerHorasExtrasPorCedula(anho: any, mes: any, cedula: any): Observable<any> {
      return this.http.get(this.url1 + "horasExtras/" + anho + "/" + mes + "/" + cedula);
    }
  */
}



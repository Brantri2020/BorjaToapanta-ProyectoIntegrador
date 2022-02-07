import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HoraExtra } from '../model/horaExtra';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HoraExtraService {

  url1 = 'http://localhost:3000/api/horasExtra/';

  constructor(private http: HttpClient,
    public router: Router) { }

    getHorasExtra(anho:any,mes:any): Observable<any>{
      return this.http.get(this.url1+anho+"/"+mes);
    }
  
    buscarHoraExtra(busqueda: string,anho:string,mes:string): Observable<any> {
      return this.http.get(this.url1 +anho+"/"+mes+ "busqueda/"+busqueda);
    }
  
    eliminarHoraExtra(id: string,anho:string,mes:string): Observable<any>{
      return this.http.delete(this.url1+anho+"/"+mes+ "/" + id);
    }
  
    editarHoraExtra(id: any, horaExtra: HoraExtra,anho:any,mes:any): Observable<any>{
      return this.http.put(this.url1 +anho+"/"+mes+ id, horaExtra);
    }
  
    guardarHoraExtra(horaExtra: HoraExtra,anho:any,mes:any): Observable<any>{
      return this.http.post(this.url1+anho+"/"+mes, horaExtra);
    }
  
    obtenerHoraExtra(id: string,anho:any,mes:any): Observable<any>{
      return this.http.get(this.url1+anho+"/"+mes+id);
    }
  
    obtenerHoraExtraOrdenada(filtro: string,anho:string,mes:string): Observable<any>{
      return this.http.get(this.url1+anho+"/"+mes+"horas-extra-ordenadas/"+filtro);
    }

}

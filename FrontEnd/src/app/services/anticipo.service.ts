import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anticipo } from '../model/anticipo';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AnticipoService {

  url1 = 'http://localhost:3000/api/anticipos/';
  url2 = 'http://localhost:3000/api/anticipo/';

  constructor(private http: HttpClient,
    public router: Router) { }

  getAnticipos(anho:any,mes:any): Observable<any>{
    return this.http.get(this.url1+anho+"/"+mes);
  }

  buscarAnticipo(busqueda: string,anho:any,mes:any): Observable<any> {
    return this.http.get(this.url1 +anho+"/"+mes+ "busqueda/"+busqueda);
  }

  eliminarAnticipo(id: string): Observable<any>{
    return this.http.delete(this.url1 + id);
  }

  editarAnticipo(id: string, anticipo: Anticipo,anho:any,mes:any): Observable<any>{
    return this.http.put(this.url2 +anho+"/"+mes+ id, anticipo);
  }

  guardarAnticipo(anticipo: Anticipo,anho:any,mes:any): Observable<any>{
    return this.http.post(this.url2+anho+"/"+mes, anticipo);
  }

  obtenerAnticipo(id: string,anho:any,mes:any): Observable<any>{
    return this.http.get(this.url2+anho+"/"+mes+id);
  }

  obtenerAnticipoOrdenado(filtro: string,anho:any,mes:any): Observable<any>{
    return this.http.get(this.url1+anho+"/"+mes+"anticipos-ordenados/"+filtro);
  }
}

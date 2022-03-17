import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../model/evento';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  url1 = 'http://localhost:3000/api/eventos/';


  constructor(private http: HttpClient,
    public router: Router) { }

  getEventos(anho: any, mes: any): Observable<any> {
    return this.http.get(this.url1 + anho + "/" + mes);
  }

  buscarEvento(busqueda: string, anho: string, mes: string): Observable<any> {
    return this.http.get(this.url1 + anho + "/" + mes + "/busqueda/" + busqueda);
  }

  obtenerEventosOrdenado(filtro: string, anho: string, mes: string): Observable<any> {
    return this.http.get(this.url1 + anho + "/" + mes + "/eventos-ordenados/" + filtro);
  }

  eliminarEvento(id: string, anho: string, mes: string): Observable<any> {
    return this.http.delete(this.url1 + anho + "/" + mes + "/" + id);
  }

  guardarEvento(evento: Evento, anho: any, mes: any): Observable<any> {
    return this.http.post(this.url1 + anho + "/" + mes, evento);
  }

  editarEvento(id: any, evento: Evento, anho: any, mes: any): Observable<any> {
    return this.http.put(this.url1 + anho + "/" + mes + "/" + id, evento);
  }

  obtenerEvento(id: string, anho: any, mes: any): Observable<any> {
    return this.http.get(this.url1 + anho + "/" + mes + "/" + id);
  }
}



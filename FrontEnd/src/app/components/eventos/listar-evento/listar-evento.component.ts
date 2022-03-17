import { Component, OnInit, Provider } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventosService } from 'src/app/services/eventos.service';
import { Router } from '@angular/router';
import { Evento } from 'src/app/model/evento';

@Component({
  selector: 'app-listar-evento',
  templateUrl: './listar-evento.component.html',
  styleUrls: ['./listar-evento.component.css']
})
export class ListarEventoComponent implements OnInit {

  busquedaEventoForm: FormGroup;
  listEvento: Evento[] = [];
  listEvento2: Evento[] = [];
  listaAnhos: any = [];
  i = 0;
  anho = "";
  mes = "";
  nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  constructor(private _eventoServices: EventosService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,) {
    this.busquedaEventoForm = this.fb.group({
      busqueda: ['',]
    });
  }

  ngOnInit(): void {   
    this.llenarFecha();
    for (var i = 2010; i < 2050; i++) {
      this.listaAnhos.push(i);
    }
    this.obtenerEventos(this.anho, this.mes);
    this.cambioFecha();
  }

  cambioFecha() {
    const selectElementMes = document.getElementById('mesSelect');
    const selectElementAnho = document.getElementById('anhoSelect');

    if (selectElementMes === null) {

    } else {
      selectElementMes.addEventListener('change', (event) => {
        this.mes = (<HTMLInputElement>selectElementMes).value;

        this.obtenerEventos(this.anho, this.mes);

      });

    }

    if (selectElementAnho === null) {

    } else {
      selectElementAnho.addEventListener('change', (event) => {
        this.anho = (<HTMLInputElement>selectElementAnho).value;
        this.obtenerEventos(this.anho, this.mes);
      });

    }
  }

  llenarFecha() {
    var fecha = new Date();
    this.anho = fecha.getFullYear().toString();
    this.mes = this.nombreMeses[fecha.getMonth()];
  }

  obtenerEventos(anho: any, mes: any) {
    this._eventoServices.getEventos(anho, mes).subscribe(data => {
      
      this.listEvento = data;

    }, error => {
      console.log(error);
    })
  }

  buscarEvento() {
    if (this.busquedaEventoForm.get('busqueda')?.value == "") {

      this.obtenerEventos(this.anho, this.mes);
    } else {
      this._eventoServices.buscarEvento(this.busquedaEventoForm.get('busqueda')?.value, this.anho, this.mes).subscribe(data => {
        this.listEvento = data;
      }, error => {
        console.log(error);
      })
    }
  }

  ordenarEvento(filtro: any) {
    this.i++;
    this._eventoServices.obtenerEventosOrdenado(filtro, this.anho, this.mes).subscribe(data => {
      if (this.i % 2 == 1) {
        this.listEvento = data;

      } else {
        this.listEvento2 = data;
        this.listEvento = this.listEvento2.slice().reverse();
      }
    }, error => {
      console.log(error);
    })
  }

  eliminarEvento(id: any,anho: any, mes: any) {
    var resultado = window.confirm('¿Estas seguro de eliminar el evento?');
    if (resultado === true) {
      this._eventoServices.eliminarEvento(id, anho, mes).subscribe(data => {
        this.toastr.error('El evento fue eliminado con éxito', 'Evento eliminado');
        this.obtenerEventos(this.anho, this.mes);
    
      }, error =>{
        console.log(error);
      })
    } else { 
        this.toastr.warning('No se realizó ningún cambio', 'No eliminado');
        this.obtenerEventos(this.anho, this.mes);
    }

  }


}



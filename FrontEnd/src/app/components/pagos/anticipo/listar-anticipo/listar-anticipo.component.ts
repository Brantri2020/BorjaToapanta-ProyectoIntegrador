import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Anticipo } from 'src/app/model/anticipo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnticipoService } from 'src/app/services/anticipo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-anticipo',
  templateUrl: './listar-anticipo.component.html',
  styleUrls: ['./listar-anticipo.component.css']
})
export class ListarAnticipoComponent implements OnInit {

  busquedaAntForm: FormGroup;
  listAnticipo: Anticipo[] = [];
  listAnticipo2: Anticipo[] = [];
  listaAnhos: any = [];
  i = 0;
  anho = "";
  mes = "";
  nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  constructor(private _anticipoServices: AnticipoService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,) {
    this.busquedaAntForm = this.fb.group({
      busqueda: ['',]
    });
  }

  ngOnInit(): void {
    this.router.navigate(['/anticipos']);
    this.llenarFecha();
    for (var i = 2010; i < 2050; i++) {
      this.listaAnhos.push(i);
    }
    this.obtenerAnticipo(this.anho, this.mes);
    this.cambioFecha();
  }

  cambioFecha() {
    const selectElementMes = document.getElementById('mesSelect');
    const selectElementAnho = document.getElementById('anhoSelect');

    if (selectElementMes === null) {

    } else {
      selectElementMes.addEventListener('change', (event) => {
        this.mes = (<HTMLInputElement>selectElementMes).value;

        this.obtenerAnticipo(this.anho, this.mes);

      });

    }

    if (selectElementAnho === null) {

    } else {
      selectElementAnho.addEventListener('change', (event) => {
        this.anho = (<HTMLInputElement>selectElementAnho).value;
        this.obtenerAnticipo(this.anho, this.mes);
      });

    }
  }

  llenarFecha() {
    var fecha = new Date();
    this.anho = fecha.getFullYear().toString();
    this.mes = this.nombreMeses[fecha.getMonth()];
  }

  buscarAnticipo() {
    if (this.busquedaAntForm.get('busqueda')?.value == "") {

      this.obtenerAnticipo(this.anho, this.mes);
    } else {
      this._anticipoServices.buscarAnticipo(this.busquedaAntForm.get('busqueda')?.value, this.anho, this.mes).subscribe(data => {
        this.listAnticipo = data;
      }, error => {
        console.log(error);
      })
    }
  
  }

  eliminarAnticipo(id:any){
  
    var resultado = window.confirm('¿Estas seguro de eliminar el anticipo?');
    if (resultado === true) {
      this._anticipoServices.eliminarAnticipo(id).subscribe(data => {
        this.toastr.error('El anticipo fue eliminado con éxito', 'Anticipo eliminado');
        this.obtenerAnticipo(this.anho, this.mes);
        }, error =>{
          console.log(error);
        })
    } else { 
        this.toastr.warning('No se realizó ningún cambio', 'NO eliminado');
        this.obtenerAnticipo(this.anho, this.mes);
    }
  
    
  }

  obtenerAnticipo(anho: any, mes: any) {
    this._anticipoServices.getAnticipos(anho, mes).subscribe(data => {
      console.log(data);
      this.listAnticipo = data;

    }, error => {
      console.log(error);
    })
  }

  ordenarAnticipo(filtro: any) {
    this.i++;
    this._anticipoServices.obtenerAnticipoOrdenado(filtro, this.anho, this.mes).subscribe(data => {
      if (this.i % 2 == 1) {
        this.listAnticipo = data;

      } else {
        this.listAnticipo2 = data;
        this.listAnticipo = this.listAnticipo2.slice().reverse();
      }
    }, error => {
      console.log(error);
    })
  }
}
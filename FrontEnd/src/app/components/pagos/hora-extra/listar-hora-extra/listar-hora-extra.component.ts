import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { HoraExtra } from 'src/app/model/horaExtra';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HoraExtraService } from 'src/app/services/hora-extra.service';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/model/empleado';
import { HoraExtra2 } from 'src/app/model/horaExtra2';

@Component({
  selector: 'app-listar-hora-extra',
  templateUrl: './listar-hora-extra.component.html',
  styleUrls: ['./listar-hora-extra.component.css']
})
export class ListarHoraExtraComponent implements OnInit {

  busquedaHEForm: FormGroup;
  listHoraExtra: HoraExtra[] = [];
  listHoraExtra2: HoraExtra[] = [];
  listEmpleado: Empleado[] = [];
  listHoraExtra3: HoraExtra2[] = [];
  nombreEmp = "";
  listaAnhos: any = [];
  i = 0;
  anho = "";
  mes = "";
  nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  constructor(private _horaExtraServices: HoraExtraService,
    private _empleadoServices: EmpleadoService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,) {
    this.busquedaHEForm = this.fb.group({
      busqueda: ['',]
    });
  }

  ngOnInit(): void {
    this.router.navigate(['/horasExtra']);
    this.llenarFecha();
    for (var i = 2010; i < 2050; i++) {
      this.listaAnhos.push(i);
    }
    this.obtenerHoraExtra(this.anho, this.mes);
    this.cambioFecha();
    
    //this.obtenerEmpleado(this.anho, this.mes);
  }

  cambioFecha() {
    const selectElementMes = document.getElementById('mesSelect');
    const selectElementAnho = document.getElementById('anhoSelect');

    if (selectElementMes === null) {

    } else {
      selectElementMes.addEventListener('change', (event) => {
        this.mes = (<HTMLInputElement>selectElementMes).value;

        this.obtenerHoraExtra(this.anho, this.mes);

      });

    }

    if (selectElementAnho === null) {

    } else {
      selectElementAnho.addEventListener('change', (event) => {
        this.anho = (<HTMLInputElement>selectElementAnho).value;
        this.obtenerHoraExtra(this.anho, this.mes);
      });

    }
  }

  llenarFecha() {
    var fecha = new Date();
    this.anho = fecha.getFullYear().toString();
    this.mes = this.nombreMeses[fecha.getMonth()];
  }

  buscarHoraExtra() {
    if (this.busquedaHEForm.get('busqueda')?.value == "") {

      this.obtenerHoraExtra(this.anho, this.mes);
    } else {
      this._horaExtraServices.buscarHoraExtra(this.busquedaHEForm.get('busqueda')?.value, this.anho, this.mes).subscribe(data => {
        this.listHoraExtra = data;
      }, error => {
        console.log(error);
      })
    }
  
  }

  eliminarHoraExtra(id:any){
  
    var resultado = window.confirm('¿Estas seguro de eliminar la hora extra?');
    if (resultado === true) {
      this._horaExtraServices.eliminarHoraExtra(id).subscribe(data => {
        this.toastr.error('La hora extra fue eliminada con éxito', 'Hora extra eliminada');
        this.obtenerHoraExtra(this.anho, this.mes);
        }, error =>{
          console.log(error);
        })
    } else { 
        this.toastr.warning('No se realizó ningún cambio', 'NO eliminado');
        this.obtenerHoraExtra(this.anho, this.mes);
    }
  
    
  }

  obtenerHoraExtra(anho: any, mes: any) {
     this._horaExtraServices.getHorasExtra(anho,mes).subscribe(data => {
        console.log(data);
      this.listHoraExtra = data;

      this.obtenerNombre(this.listHoraExtra);
      
    }, error => {
      console.log(error);
    })
    
  }

  ordenarHoraExtra(filtro: any) {
    this.i++;
    this._horaExtraServices.obtenerHoraExtraOrdenada(filtro, this.anho, this.mes).subscribe(data => {
      if (this.i % 2 == 1) {
        this.listHoraExtra = data;

      } else {
        this.listHoraExtra2 = data;
        this.listHoraExtra = this.listHoraExtra2.slice().reverse();
      }
    }, error => {
      console.log(error);
    })
  }

  obtenerNombre(listHoraExtra: HoraExtra[]){
    //this.obtenerAnticipo(anho,mes);

    this._empleadoServices.getEmpleados().subscribe(data => {
      console.log(data);
    
    this.listEmpleado = data;
    
    listHoraExtra.forEach(element => {
      this.listEmpleado.forEach(element1 => {
        if (element1.cedula == element.cedulaEmpleado) {

          //this.nombreEmp = element1.nombre;
          const HORAEXTRA2: HoraExtra2 = {
            cedulaEmpleado: element.cedulaEmpleado,
            nombreEmpleado: element1.nombre,
            cantidadHoras: element.cantidadHoras,
            valorXHora: element.valorXHora,
            valorFinalHoras: element.valorFinalHoras,
            fechaHoraExtra: element.fechaHoraExtra
          };
          this.listHoraExtra3.push(HORAEXTRA2);

        }
        
      });
    });
  }, error => {
    console.log(error);
  })
     
  }

  

}
import { Component, OnInit, Provider } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PorcentajesService } from 'src/app/services/porcentajes.service';
import { Router } from '@angular/router';
import { Porcentaje } from 'src/app/model/porcentaje';

@Component({
  selector: 'app-listar-porcentajes',
  templateUrl: './listar-porcentajes.component.html',
  styleUrls: ['./listar-porcentajes.component.css']
})
export class ListarPorcentajesComponent implements OnInit {

  busquedaPorcentajeForm: FormGroup;
  listPorcentaje: Porcentaje[] = [];
  listPorcentaje2: Porcentaje[] = [];
  listaAnhos: any = [];
  i = 0;
  anho = "";
  mes = "";
  nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];



  constructor(private _porcentajeServices: PorcentajesService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,) {
    this.busquedaPorcentajeForm = this.fb.group({
      busqueda: ['',]
    });
  }

  ngOnInit(): void {
    //this.router.navigate(['/nomina-pagos']);    
    this.llenarFecha();
    for (var i = 2010; i < 2050; i++) {
      this.listaAnhos.push(i);
    }
    this.obtenerPorcentajes(this.anho, this.mes);
    this.cambioFecha();



  }

  cambioFecha() {
    const selectElementMes = document.getElementById('mesSelect');
    const selectElementAnho = document.getElementById('anhoSelect');

    if (selectElementMes === null) {

    } else {
      selectElementMes.addEventListener('change', (event) => {
        this.mes = (<HTMLInputElement>selectElementMes).value;

        this.obtenerPorcentajes(this.anho, this.mes);

      });

    }

    if (selectElementAnho === null) {

    } else {
      selectElementAnho.addEventListener('change', (event) => {
        this.anho = (<HTMLInputElement>selectElementAnho).value;
        this.obtenerPorcentajes(this.anho, this.mes);
      });

    }
  }



  llenarFecha() {
    var fecha = new Date();
    this.anho = fecha.getFullYear().toString();
    this.mes = this.nombreMeses[fecha.getMonth()];
  }

  buscarPorcentaje() {
    if (this.busquedaPorcentajeForm.get('busqueda')?.value == "") {

      this.obtenerPorcentajes(this.anho, this.mes);
    } else {
      this._porcentajeServices.buscarPorcentaje(this.busquedaPorcentajeForm.get('busqueda')?.value, this.anho, this.mes).subscribe(data => {
        this.listPorcentaje = data;
      }, error => {
        console.log(error);
      })
    }
  }


  obtenerPorcentajes(anho: any, mes: any) {
    this._porcentajeServices.getPorcentajes(anho, mes).subscribe(data => {
      
      this.listPorcentaje = data;

    }, error => {
      console.log(error);
    })
  }

  eliminarPorcentaje(id: any,anho: any, mes: any) {
    var resultado = window.confirm('¿Estas seguro de eliminar el porcentaje?');
    if (resultado === true) {
      this._porcentajeServices.eliminarPorcentaje(id, anho, mes).subscribe(data => {
        this.toastr.error('El porcentaje fue eliminado con éxito', 'Porcentaje eliminado');
        this.obtenerPorcentajes(this.anho, this.mes);
    
      }, error =>{
        console.log(error);
      })
    } else { 
        this.toastr.warning('No se realizó ningún cambio', 'No eliminado');
        this.obtenerPorcentajes(this.anho, this.mes);
    }

  }


/*

  ordenarPorcentaje(filtro: any) {
    this.i++;
    this._porcentajeServices.obtenerPorcentajesOrdenado(filtro, this.anho, this.mes).subscribe(data => {
      if (this.i % 2 == 1) {
        this.listPorcentaje = data;

      } else {
        this.listPorcentaje2 = data;
        this.listPorcentaje = this.listPorcentaje2.slice().reverse();
      }
    }, error => {
      console.log(error);
    })
  }



  
*/

}



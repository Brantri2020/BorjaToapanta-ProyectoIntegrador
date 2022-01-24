import { Component, OnInit, Provider } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { NominaPago } from 'src/app/model/NominaPago';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NominaPagoService } from 'src/app/services/nomina-pago.service';

@Component({
  selector: 'app-nomina-pagos',
  templateUrl: './nomina-pagos.component.html',
  styleUrls: ['./nomina-pagos.component.css']
})
export class NominaPagosComponent implements OnInit {

  busquedaNomForm: FormGroup;
  listNominasPago: NominaPago[] = [];
  listNominasPago2: NominaPago[] = [];
  i = 0;
  anho = "";
  mes = "";
  nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  constructor(private _nominaPagoServices: NominaPagoService,
    private toastr: ToastrService,
    private fb: FormBuilder) {
    this.busquedaNomForm = this.fb.group({
      busqueda: ['',]
    });
  }

  ngOnInit(): void {
    this.llenarFecha();
    //this.obtenerNominasPago();
    this.cambioFecha();


  }

  cambioFecha() {
    const selectElementMes = document.getElementById('mesSelect');
    const selectElementAnho = document.getElementById('anhoSelect');

    if (selectElementMes === null) {

    } else {
      selectElementMes.addEventListener('change', (event) => {
        this.mes=(<HTMLInputElement>selectElementMes).value;
       
    });
    
    }

    if (selectElementAnho === null) {

    } else {
      selectElementAnho.addEventListener('change', (event) => {
        this.anho=(<HTMLInputElement>selectElementAnho).value;
       
    });
    
    }
  }

  

  llenarFecha() {
    var fecha = new Date();
    this.anho = fecha.getFullYear().toString();
    this.mes = this.nombreMeses[fecha.getMonth()];
  }

  buscarNominaPago() {
    if (this.busquedaNomForm.get('busqueda')?.value == "") {

      this.obtenerNominasPago();
    } else {
      this._nominaPagoServices.buscarNominaPago(this.busquedaNomForm.get('busqueda')?.value).subscribe(data => {
        this.listNominasPago = data;
      }, error => {
        console.log(error);
      })
    }




  }



  obtenerNominasPago() {
    this._nominaPagoServices.getNominasPago().subscribe(data => {
      console.log(data);
      this.listNominasPago = data;

    }, error => {
      console.log(error);
    })
  }

  ordenarNominaPago(filtro: any) {
    this.i++;
    this._nominaPagoServices.obtenerNominaPagoOrdenado(filtro).subscribe(data => {
      if (this.i % 2 == 1) {
        this.listNominasPago = data;

      } else {
        this.listNominasPago2 = data;
        this.listNominasPago = this.listNominasPago2.slice().reverse();
      }
    }, error => {
      console.log(error);
    })
  }


  eliminarNominaPago(id: any) {

    this._nominaPagoServices.eliminarNominaPago(id).subscribe(data => {
      this.toastr.error('La nómina de pago fué eliminada con éxito', 'Nómina de pago eliminada');
      this.obtenerNominasPago();

    }, error => {
      console.log(error);
    })
  }




}



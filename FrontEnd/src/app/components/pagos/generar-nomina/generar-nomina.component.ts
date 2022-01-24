import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { nominaFecha } from 'src/app/model/nominaFecha';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NominaFechaService } from 'src/app/services/nomina-fecha.service';

@Component({
  selector: 'app-generar-nomina',
  templateUrl: './generar-nomina.component.html',
  styleUrls: ['./generar-nomina.component.css']
})
export class GenerarNominaComponent implements OnInit {
  
  listNominasFecha: nominaFecha[] = [];
  listNominasFecha2: nominaFecha[] = [];
  i = 0;
  anho = "";
  mes = "";
  nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  constructor(private _nominaFechaServices: NominaFechaService,
    private toastr: ToastrService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
  
    this.obtenerNominasFecha();
    
  }



  obtenerNominasFecha() {
    this._nominaFechaServices.getNominasFecha().subscribe(data => {
      console.log(data);
      this.listNominasFecha = data;

    }, error => {
      console.log(error);
    })
  }
  /*

  ordenarNominaPago(filtro: any) {
    this.i++;
    this._nominaFechaServices.obtenerNominaPagoOrdenado(filtro).subscribe(data => {
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

*/


}



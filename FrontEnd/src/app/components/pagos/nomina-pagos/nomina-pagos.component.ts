import { Component, OnInit, Provider } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { NominaPago } from 'src/app/model/nominaPago';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NominaPagoService } from 'src/app/services/nomina-pago.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nomina-pagos',
  templateUrl: './nomina-pagos.component.html',
  styleUrls: ['./nomina-pagos.component.css']
})
export class NominaPagosComponent implements OnInit {

  busquedaNomForm: FormGroup;
  listNominasPago: NominaPago[] = [];
  listNominasPago2: NominaPago[] = [];
  listaAnhos: any = [];
  i = 0;
  anho = "";
  mes = "";
  nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];



  constructor(private _nominaPagoServices: NominaPagoService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,) {
    this.busquedaNomForm = this.fb.group({
      busqueda: ['',]
    });
  }

  ngOnInit(): void {
    this.router.navigate(['/nomina-pagos']);
    this.llenarFecha();
    for (var i = 2010; i < 2050; i++) {
      this.listaAnhos.push(i);
    }
    this.obtenerNominasPago(this.anho, this.mes);
    this.cambioFecha();



  }

  cambioFecha() {
    const selectElementMes = document.getElementById('mesSelect');
    const selectElementAnho = document.getElementById('anhoSelect');

    if (selectElementMes === null) {

    } else {
      selectElementMes.addEventListener('change', (event) => {
        this.mes = (<HTMLInputElement>selectElementMes).value;

        this.obtenerNominasPago(this.anho, this.mes);

      });

    }

    if (selectElementAnho === null) {

    } else {
      selectElementAnho.addEventListener('change', (event) => {
        this.anho = (<HTMLInputElement>selectElementAnho).value;
        this.obtenerNominasPago(this.anho, this.mes);
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

      this.obtenerNominasPago(this.anho, this.mes);
    } else {
      this._nominaPagoServices.buscarNominaPago(this.busquedaNomForm.get('busqueda')?.value, this.anho, this.mes).subscribe(data => {
        this.listNominasPago = data;
      }, error => {
        console.log(error);
      })
    }




  }

  eliminarNominasPago(anho: any, mes: any) {

    var resultado = window.confirm('¿Estas seguro de eliminar las nominas de pago?');
    if (resultado === true) {
      this._nominaPagoServices.eliminarNominasPago(anho, mes).subscribe(data => {
        this.toastr.error('Las nominas de pago fueron eliminada con éxito', 'Nomias de pago eliminadas');

        this.router.navigate(['/nomina-pagos']);
        this.obtenerNominasPago(anho, mes);

      }, error => {
        console.log(error);
      })
    } else {
      this.toastr.warning('No se realizó ningún cambio', 'NO eliminado');

      this.router.navigate(['/nomina-pagos']);
    }



  }


  obtenerNominasPago(anho: any, mes: any) {
    this._nominaPagoServices.getNominasPago(anho, mes).subscribe(data => {
      console.log(data);
      this.listNominasPago = data;

    }, error => {
      console.log(error);
    })
  }




  ordenarNominaPago(filtro: any) {
    this.i++;
    this._nominaPagoServices.obtenerNominasPagoOrdenado(filtro, this.anho, this.mes).subscribe(data => {
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
    var resultado = window.confirm('¿Estas seguro de eliminar la nómina de pago?');
    if (resultado === true) {
      this._nominaPagoServices.obtenerNominaPago(id, this.anho, this.mes).subscribe(data => {

        const ROL_INDIVIDUAL = {

          cedula: data.cedula,
          nomina: data.nomina,
          cargo: data.cargo,
          salario: data.salario,
          numHorasExtras: "",
          valorHorasExtras: "",
          sePagaFondosReserva: "",
          fondosReserva: "",
          totalIngresos: "",
          iess: "",
          anticipo: "",
          prestamoIess: "",
          totalEgreso: "",
          liquidoRecibir: "",
          numeroCuenta: data.numeroCuenta,
          tipoCuenta: data.tipoCuenta,
          institucionFinanciera: data.institucionFinanciera
        }

        this._nominaPagoServices.editarNominaPago(id, ROL_INDIVIDUAL, this.anho, this.mes).subscribe(data => {
          this.toastr.error('La nómina de pago fué eliminada con éxito', 'Nómina de pago eliminada');
          this.router.navigate(['/nomina-pagos']);
          this.obtenerNominasPago(this.anho, this.mes);

        }, error => {
          console.log(error);

        })

      }, error => {

        console.log(error);
      })

      this.obtenerNominasPago(this.anho, this.mes);

    } else {
      this.toastr.warning('No se realizó ningún cambio', 'NO eliminado');

    }

  }


}



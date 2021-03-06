


import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NominaPago } from 'src/app/model/nominaPago';
import { Porcentaje } from 'src/app/model/porcentaje';
//import { NominaPagoMenosInfo } from 'src/app/model/nominaPagoMenosInfo';
import { MustMatch } from 'src/app/services/must-match.validator';
import { NominaPagoService } from 'src/app/services/nomina-pago.service';
import { PorcentajesService } from 'src/app/services/porcentajes.service';



@Component({
  selector: 'app-rol-individual',
  templateUrl: './rol-individual.component.html',
  styleUrls: ['./rol-individual.component.css']
})
export class RolIndividualComponent implements OnInit {
  listNominasPago: NominaPago[] = [];
  listPorcentajes: Porcentaje[] = [];

  listFondo: string[] = [];
  listIess: string[] = [];

  rolIndividualForm: FormGroup;
  titulo = 'Rol Individual';
  id: string | null;
  anho: string | null;
  mes: string | null;
  mensaje: string = "";
  numeroCuenta = "";
  tipoCuenta = "";
  institucionFinanciera = "";
  salarioSum: any;
  valorHorasExtrasSum: any;
  fondosReservaSum: any;
  porcentajeFondoSum: any;
  totalIngresosSum: any;
  iessSum: any;
  porcentajeIessSum: any;
  anticipoSum: any;
  prestamoIessSum: any;
  liquidoRecibirSum: any;
  totalEgresoSum: any;
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _nominaPagoService: NominaPagoService,
    private _porcentajeService: PorcentajesService,
    private aRouter: ActivatedRoute) {

    this.rolIndividualForm = this.fb.group({
      cedula: ['', Validators.required],
      nomina: ['', Validators.required],
      cargo: ['', Validators.required],
      salario: ['', Validators.required],
      valorHorasExtras: ['', Validators.required],
      numeroHorasExtras: ['',],
      fondosReserva: ['', Validators.required],
      sePagaFondosReserva: ['', Validators.required],
      porcentajeFondo: ['', Validators.required],
      totalIngresos: ['', Validators.required],
      iess: ['', Validators.required],
      porcentajeIess: ['', Validators.required],
      anticipo: ['', Validators.required],
      prestamoIess: ['', Validators.required],
      totalEgreso: ['', Validators.required],
      liquidoRecibir: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.anho = this.aRouter.snapshot.paramMap.get('anho');
    this.mes = this.aRouter.snapshot.paramMap.get('mes');
  }

  ngOnInit(): void {
    this.obtenerPorcentajes();
    this.esEditar();
    this.sePagaFondoReserva();
    this.aporteIess();

  }




  sePagaFondoReserva() {


    const selectElementBoolean = document.getElementById('booleanSelect');
    const selectElementPorcentaje = document.getElementById('porcentajeSelect');

    if (selectElementBoolean === null) {

    } else {
      selectElementBoolean.addEventListener('change', (event) => {
        if (selectElementPorcentaje === null) {
        } else {
          if (this.rolIndividualForm.get('sePagaFondosReserva')?.value == "Si") {

            selectElementPorcentaje.style.display = "inline";

          } else {

            selectElementPorcentaje.style.display = "none";
            selectElementPorcentaje.tabIndex = 0;
            this.rolIndividualForm.controls['porcentajeFondo'].setValue("0");

          }
        }



        if (this.rolIndividualForm.get('sePagaFondosReserva')?.value == "Si" && this.rolIndividualForm.get('porcentajeFondo')?.value !== "") {



          this.fondosReservaSum = this.salarioSum * this.rolIndividualForm.get('porcentajeFondo')?.value / 100;
          this.fondosReservaSum = parseFloat(this.fondosReservaSum).toFixed(2);
          this.rolIndividualForm.controls['fondosReserva'].setValue(this.fondosReservaSum);
        } else {
          this.fondosReservaSum = "0.00";
          this.rolIndividualForm.controls['fondosReserva'].setValue(this.fondosReservaSum);
        }


        this.calcularValores();
      });

    }

    if (selectElementPorcentaje === null) {

    } else {
      selectElementPorcentaje.addEventListener('change', (event) => {

        if (this.rolIndividualForm.get('sePagaFondosReserva')?.value == "Si" && this.rolIndividualForm.get('porcentajeFondo')?.value !== "") {


          this.fondosReservaSum = this.salarioSum * this.rolIndividualForm.get('porcentajeFondo')?.value / 100;
          this.fondosReservaSum = parseFloat(this.fondosReservaSum).toFixed(2);
          this.rolIndividualForm.controls['fondosReserva'].setValue(this.fondosReservaSum);

        } else {
          this.fondosReservaSum = "0.00";
          this.rolIndividualForm.controls['fondosReserva'].setValue(this.fondosReservaSum);
        }
        this.calcularValores();

      });


    }


  }

  aporteIess() {


    const selectElementAporte = document.getElementById('aporteSelect');

    if (selectElementAporte === null) {

    } else {
      selectElementAporte.addEventListener('change', (event) => {


        this.iessSum = this.salarioSum * this.rolIndividualForm.get('porcentajeIess')?.value / 100;
        this.iessSum = parseFloat(this.iessSum).toFixed(2);
        this.rolIndividualForm.controls['iess'].setValue(this.iessSum);



        this.calcularValores();
      });

    }

  }

  obtenerPorcentajes() {

    this._porcentajeService.getPorcentajes(this.anho, this.mes).subscribe(data => {

      this.listPorcentajes = data;
      this.listPorcentajes.forEach(element => {

        if (element.tipoPorcentaje == "Fondos de reserva") {

          this.listFondo.push(element.porcentaje.toString());

        } else if (element.tipoPorcentaje == "Iess") {
          this.listIess.push(element.porcentaje.toString());
        }
      });


    }, error => {
      console.log(error);
    })
  }



  agregarRolIndividual() {

    var ced = "";

    var cedulaDato = document.getElementById('cedul');
    var valorCedula = "";
    if (cedulaDato !== null) {
      valorCedula = (<HTMLInputElement>cedulaDato).value;
    }


    var fondosReservaDato = document.getElementById('fondosReserva');
    var iessDato = document.getElementById('iessDato');
    var prestamoIessDato = document.getElementById('prestamoIess');

    var valorPrestamoIess = 0.00;
    if (prestamoIessDato !== null) {
      valorPrestamoIess = parseFloat((<HTMLInputElement>prestamoIessDato).value);
    }

    if (prestamoIessDato == null) { } else {
      prestamoIessDato.addEventListener('focusout', (event) => {
        this.calcularValores();
      });
    }

    var valorIess = 0.00;
    if (iessDato !== null) {
      valorIess = parseFloat((<HTMLInputElement>iessDato).value);
    }

    if (iessDato == null) { } else {
      iessDato.addEventListener('focusout', (event) => {
        this.calcularValores();
      });
    }

    var valorFondosReserva = 0.00;
    if (fondosReservaDato !== null) {
      valorFondosReserva = parseFloat((<HTMLInputElement>fondosReservaDato).value);
    }

    if (fondosReservaDato == null) { } else {
      fondosReservaDato.addEventListener('focusout', (event) => {
        this.calcularValores();
      });
    }



    ced = valorCedula;
    this.obtenerAnticipoHorasExtrasPorCedula(ced)
      .then((data: any) => {
        this.rolIndividualForm.controls['anticipo'].setValue(data.valorAnticipo);
        this.rolIndividualForm.controls['valorHorasExtras'].setValue(data.valorFinalHoras);
        this.rolIndividualForm.controls['numeroHorasExtras'].setValue(data.cantidadHoras);

        this.salarioSum = parseFloat(data.salario);
        this.valorHorasExtrasSum = parseFloat(data.valorFinalHoras);
        this.fondosReservaSum = valorFondosReserva;
        this.iessSum = valorIess;
        this.anticipoSum = parseFloat(data.valorAnticipo);
        this.prestamoIessSum = valorPrestamoIess;

        this.totalIngresosSum = parseFloat(this.salarioSum + this.valorHorasExtrasSum + this.fondosReservaSum);
        this.totalEgresoSum = parseFloat(this.iessSum + this.anticipoSum + this.prestamoIessSum);
        this.liquidoRecibirSum = this.totalIngresosSum - this.totalEgresoSum;

        var totalIngresosSumStr = this.totalIngresosSum.toFixed(2).toString();
        var totalEgresoSumStr = this.totalEgresoSum.toFixed(2).toString();
        var liquidoRecibirSumStr = this.liquidoRecibirSum.toFixed(2).toString();

        if (!totalIngresosSumStr.includes(".")) {
          totalIngresosSumStr = totalIngresosSumStr + ".00";
        }
        if (!totalEgresoSumStr.includes(".")) {
          totalEgresoSumStr = totalEgresoSumStr + ".00";
        }
        if (!liquidoRecibirSumStr.includes(".")) {
          liquidoRecibirSumStr = liquidoRecibirSumStr + ".00";
        }


        this.rolIndividualForm.controls['totalIngresos'].setValue(totalIngresosSumStr);
        this.rolIndividualForm.controls['totalEgreso'].setValue(totalEgresoSumStr);
        this.rolIndividualForm.controls['liquidoRecibir'].setValue(liquidoRecibirSumStr);


        const ROL_INDIVIDUAL: NominaPago = {

          cedula: this.rolIndividualForm.get('cedula')?.value,
          nomina: this.rolIndividualForm.get('nomina')?.value,
          cargo: this.rolIndividualForm.get('cargo')?.value,
          salario: this.rolIndividualForm.get('salario')?.value,
          numeroHorasExtras: this.rolIndividualForm.get('numeroHorasExtras')?.value,
          valorHorasExtras: this.rolIndividualForm.get('valorHorasExtras')?.value,
          sePagaFondosReserva: this.rolIndividualForm.get('sePagaFondosReserva')?.value,
          fondosReserva: this.rolIndividualForm.get('fondosReserva')?.value,
          porcentajeFondo: this.rolIndividualForm.get('porcentajeFondo')?.value,
          totalIngresos: this.rolIndividualForm.get('totalIngresos')?.value,
          iess: this.rolIndividualForm.get('iess')?.value,
          porcentajeIess: this.rolIndividualForm.get('porcentajeIess')?.value,
          anticipo: this.rolIndividualForm.get('anticipo')?.value,
          prestamoIess: this.rolIndividualForm.get('prestamoIess')?.value,
          totalEgreso: this.rolIndividualForm.get('totalEgreso')?.value,
          liquidoRecibir: this.rolIndividualForm.get('liquidoRecibir')?.value,
          numeroCuenta: this.numeroCuenta,
          tipoCuenta: this.tipoCuenta,
          institucionFinanciera: this.institucionFinanciera
        }




        this._nominaPagoService.comprobarIdNominaPago(this.id, this.anho, this.mes).subscribe(data => {

          if (data == "Si") {
            //editamos nomina
            this._nominaPagoService.editarNominaPago(this.id, ROL_INDIVIDUAL, this.anho, this.mes).subscribe(data => {
              this.toastr.success('La n??mina de pago fue registrada con ??xito!', 'Nomina de pago Registrada!');
              this.router.navigate(['/nomina-pagos']);
            }, error => {
              console.log(error);
              this.mensaje = error.error;
            })
          } else {


            this._nominaPagoService.obtenerCedula(this.id).subscribe(data => {

              this._nominaPagoService.guardarNominaPago(ROL_INDIVIDUAL, this.anho, this.mes, data.toString()).subscribe(data => {
                this.toastr.success('La n??mina de pago fue registrada con ??xito!', 'Nomina de pago Registrada!');
                this.router.navigate(['/nomina-pagos']);

              }, error => {
                console.log(error);
                this.mensaje = error.error;
              })


            }, error => {
              console.log(error);
            })


            //agregamos nomina ---          


          }




        }, error => {
          console.log(error);
          this.mensaje = error.error;
        })


      })




  }


  esEditar() {
    if (this.id !== null) {


      this._nominaPagoService.obtenerNominaPago(this.id, this.anho, this.mes).subscribe(data => {


        this.rolIndividualForm.setValue({
          cedula: data.cedula,
          nomina: data.nomina,
          cargo: data.cargo,
          salario: data.salario,
          valorHorasExtras: data.valorHorasExtras,
          numeroHorasExtras: data.numeroHorasExtras,
          fondosReserva: data.fondosReserva,
          sePagaFondosReserva: data.sePagaFondosReserva,
          porcentajeFondo: data.porcentajeFondo,
          totalIngresos: data.totalIngresos,
          iess: data.iess,
          porcentajeIess: data.porcentajeIess,
          anticipo: data.anticipo,
          prestamoIess: data.prestamoIess,
          totalEgreso: data.totalEgreso,
          liquidoRecibir: data.liquidoRecibir
        })
        this.numeroCuenta = data.numeroCuenta;
        this.tipoCuenta = data.tipoCuenta;
        this.institucionFinanciera = data.institucionFinanciera;

        var ced = data.cedula.toString();

        //fondos reserva
        if (data.fondosReserva.toString() == "") {
          this.rolIndividualForm.controls['fondosReserva'].setValue("0.00");
        }
        //Ingresos
        if (data.totalIngresos.toString() == "") {
          this.rolIndividualForm.controls['totalIngresos'].setValue("0.00");
        }
        //aporte iess
        if (data.iess.toString() == "") {
          this.rolIndividualForm.controls['iess'].setValue("0.00");
        }
        //prestamo iess
        if (data.prestamoIess.toString() == "") {
          this.rolIndividualForm.controls['prestamoIess'].setValue("0.00");
        }
        //total egresos
        if (data.totalEgreso.toString() == "") {
          this.rolIndividualForm.controls['totalEgreso'].setValue("0.00");
        }
        //liquido a pagar
        if (data.liquidoRecibir.toString() == "") {
          this.rolIndividualForm.controls['liquidoRecibir'].setValue("0.00");
        }

        const selectElementPorcentaje = document.getElementById('porcentajeSelect');


        if (selectElementPorcentaje === null) {
        } else {
          
          if (this.rolIndividualForm.get('sePagaFondosReserva')?.value == "Si") {

            selectElementPorcentaje.style.display = "inline";
          }
        }

        this.calcularValores();





      })
    }

  }


  obtenerAnticipoHorasExtrasPorCedula(cedula: any) {
    return new Promise(resolve => {
      this._nominaPagoService.obtenerAnticipoHorasExtrasPorCedula(this.anho, this.mes, cedula).subscribe(data => {
        resolve(data);
      })
    })
  }
  /*
    obtenerAnticipoPorCedula(cedula: any) {
      return new Promise(resolve => {
        this._nominaPagoService.obtenerAnticipoPorCedula(this.anho, this.mes, cedula).subscribe(data => {
          resolve(data);
        })
      })
    }
  
    obtenerHorasExtrasPorCedula(cedula: any) {
      return new Promise(resolve => {
        this._nominaPagoService.obtenerHorasExtrasPorCedula(this.anho, this.mes, cedula).subscribe(data => {
          resolve(data);
        })
      })
    }
  
  */


  calcularValores() {
    var ced = "";

    var cedulaDato = document.getElementById('cedul');
    var valorCedula = "";
    if (cedulaDato !== null) {
      valorCedula = (<HTMLInputElement>cedulaDato).value;
    }


    var fondosReservaDato = document.getElementById('fondosReserva');
    var iessDato = document.getElementById('iessDato');
    var prestamoIessDato = document.getElementById('prestamoIess');

    var valorPrestamoIess = 0.00;
    if (prestamoIessDato !== null) {
      valorPrestamoIess = parseFloat((<HTMLInputElement>prestamoIessDato).value);
    }

    if (prestamoIessDato == null) { } else {
      prestamoIessDato.addEventListener('focusout', (event) => {
        this.calcularValores();
      });
    }

    var valorIess = 0.00;
    if (iessDato !== null) {
      valorIess = parseFloat((<HTMLInputElement>iessDato).value);
    }

    if (iessDato == null) { } else {
      iessDato.addEventListener('focusout', (event) => {
        this.calcularValores();
      });
    }

    var valorFondosReserva = 0.00;
    if (fondosReservaDato !== null) {
      valorFondosReserva = parseFloat((<HTMLInputElement>fondosReservaDato).value);
    }

    if (fondosReservaDato == null) { } else {
      fondosReservaDato.addEventListener('focusout', (event) => {
        this.calcularValores();
      });
    }



    ced = valorCedula;
    this.obtenerAnticipoHorasExtrasPorCedula(ced)
      .then((data: any) => {
        this.rolIndividualForm.controls['anticipo'].setValue(data.valorAnticipo);
        this.rolIndividualForm.controls['valorHorasExtras'].setValue(data.valorFinalHoras);
        this.rolIndividualForm.controls['numeroHorasExtras'].setValue(data.cantidadHoras);

        this.salarioSum = parseFloat(data.salario);
        this.valorHorasExtrasSum = parseFloat(data.valorFinalHoras);
        this.fondosReservaSum = valorFondosReserva;
        this.iessSum = valorIess;
        this.anticipoSum = parseFloat(data.valorAnticipo);
        this.prestamoIessSum = valorPrestamoIess;

        this.totalIngresosSum = parseFloat(this.salarioSum + this.valorHorasExtrasSum + this.fondosReservaSum);
        this.totalEgresoSum = parseFloat(this.iessSum + this.anticipoSum + this.prestamoIessSum);
        this.liquidoRecibirSum = this.totalIngresosSum - this.totalEgresoSum;

        var totalIngresosSumStr = this.totalIngresosSum.toFixed(2).toString();
        var totalEgresoSumStr = this.totalEgresoSum.toFixed(2).toString();
        var liquidoRecibirSumStr = this.liquidoRecibirSum.toFixed(2).toString();

        if (!totalIngresosSumStr.includes(".")) {
          totalIngresosSumStr = totalIngresosSumStr + ".00";
        }
        if (!totalEgresoSumStr.includes(".")) {
          totalEgresoSumStr = totalEgresoSumStr + ".00";
        }
        if (!liquidoRecibirSumStr.includes(".")) {
          liquidoRecibirSumStr = liquidoRecibirSumStr + ".00";
        }


        this.rolIndividualForm.controls['totalIngresos'].setValue(totalIngresosSumStr);
        this.rolIndividualForm.controls['totalEgreso'].setValue(totalEgresoSumStr);
        this.rolIndividualForm.controls['liquidoRecibir'].setValue(liquidoRecibirSumStr);
      })

  }

}

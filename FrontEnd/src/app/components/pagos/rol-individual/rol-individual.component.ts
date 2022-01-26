


import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NominaPago } from 'src/app/model/nominaPago';
import { MustMatch } from 'src/app/services/must-match.validator';
import { NominaPagoService } from 'src/app/services/nomina-pago.service';


@Component({
  selector: 'app-rol-individual',
  templateUrl: './rol-individual.component.html',
  styleUrls: ['./rol-individual.component.css']
})
export class RolIndividualComponent implements OnInit {

  rolIndividualForm: FormGroup;
  titulo = 'Rol Individual';
  id: string | null;
  anho: string | null;
  mes:string | null;
  mensaje: string = "";
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _nominaPagoService: NominaPagoService,
    private aRouter: ActivatedRoute) {

    this.rolIndividualForm = this.fb.group({
      cedula: [''],
      nomina: [''],
      cargo: [''],
      salario: [''],
      numHorasExtras: [''],
      valorHorasExtras: [''],
      sePagaFondosReserva: ['', Validators.required],
      fondosReserva: ['', Validators.required],
      totalIngresos: ['', Validators.required],
      iess: ['', Validators.required],
      anticipo: [''],
      prestamiIess: ['', Validators.required],
      totalEgreso: ['', Validators.required],
      liquidoRecibir: ['', Validators.required],
      numeroCuenta: [''],
      tipoCuenta: [''],
      institucionFinanciera: ['']
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.anho = this.aRouter.snapshot.paramMap.get('anho');
    this.mes = this.aRouter.snapshot.paramMap.get('mes');

  }

  ngOnInit(): void {
    this.esEditar();
  }





  agregarRolIndividual() {
    const ROL_INDIVIDUAL: NominaPago = {

      cedula: this.rolIndividualForm.get('cedula')?.value,
      nomina: this.rolIndividualForm.get('nomina')?.value,
      cargo: this.rolIndividualForm.get('cargo')?.value,
      salario: this.rolIndividualForm.get('salario')?.value,
      numHorasExtras: this.rolIndividualForm.get('numHorasExtras')?.value,
      valorHorasExtras: this.rolIndividualForm.get('valorHorasExtras')?.value,
      sePagaFondosReserva: this.rolIndividualForm.get('sePagaFondosReserva')?.value,
      fondosReserva: this.rolIndividualForm.get('fondosReserva')?.value,
      totalIngresos: this.rolIndividualForm.get('totalIngresos')?.value,
      iess: this.rolIndividualForm.get('iess')?.value,
      anticipo: this.rolIndividualForm.get('anticipo')?.value,
      prestamiIess: this.rolIndividualForm.get('prestamiIess')?.value,
      totalEgreso: this.rolIndividualForm.get('totalEgreso')?.value,
      liquidoRecibir: this.rolIndividualForm.get('liquidoRecibir')?.value,
      numeroCuenta: this.rolIndividualForm.get('numeroCuenta')?.value,
      tipoCuenta: this.rolIndividualForm.get('tipoCuenta')?.value,
      institucionFinanciera: this.rolIndividualForm.get('institucionFinanciera')?.value,      
    }
    if (this.id !== null || this.id !== "0") {
      //editamos nomina
      this._nominaPagoService.editarNominaPago(this.id, ROL_INDIVIDUAL, this.anho, this.mes).subscribe(data => {
        this.toastr.success('El rol individual fue actualizado con éxito!', 'Rol Individual Actualizado!');
        this.router.navigate(['/nomina-pagos']);
      }, error => {
        console.log(error);        
        this.mensaje = error.error;
      })
    } else {
      //agregamos proveedor
      window.alert("holis");
      console.log(ROL_INDIVIDUAL);
      /*
      this._nominaPagoService.guardarProveedor(PROVEEDOR).subscribe(data => {
        this.toastr.success('El proveedor fue registrado con éxito!', 'Proveedor Registrado!');
        this.router.navigate(['/proveedores']);
      }, error => {
        console.log(error);
        this.mensaje = error.error;
      })
      */
    }
  }

  esEditar() {
    if (this.id !== null) {
      
      this._nominaPagoService.obtenerNominaPago(this.id, this.anho,this.mes).subscribe(data => {
        this.rolIndividualForm.setValue({
          cedula: data.cedula,
          nomina: data.nomina,
          salario: data.salario,
          cargo: data.cargo,
          numHorasExtras: data.numHorasExtras,
          valorHorasExtras: data.valorHorasExtras,
          sePagaFondosReserva: data.sePagaFondosReserva,
          fondosReserva: data.fondosReserva,
          totalIngresos: data.totalIngresos,
          iess: data.iess,
          anticipo: data.anticipo,
          prestamiIess: data.prestamiIess,
          totalEgreso: data.totalEgreso,
          liquidoRecibir: data.liquidoRecibir,
          numeroCuenta: data.numeroCuenta,
          tipoCuenta: data.tipoCuenta,
          institucionFinanciera: data.institucionFinanciera
        })
      })
    }
  }




}




import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NominaPago } from 'src/app/model/nominaPago';
import { NominaPagoMenosInfo } from 'src/app/model/nominaPagoMenosInfo';
import { MustMatch } from 'src/app/services/must-match.validator';
import { NominaPagoService } from 'src/app/services/nomina-pago.service';



@Component({
  selector: 'app-rol-individual',
  templateUrl: './rol-individual.component.html',
  styleUrls: ['./rol-individual.component.css']
})
export class RolIndividualComponent implements OnInit {
  listNominasPago: NominaPago[] = [];
  rolIndividualForm: FormGroup;
  titulo = 'Rol Individual';
  id: string | null;
  anho: string | null;
  mes: string | null;
  mensaje: string = "";
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _nominaPagoService: NominaPagoService,
    private aRouter: ActivatedRoute) {

    this.rolIndividualForm = this.fb.group({
      cedula: ['', Validators.required],
      nomina: ['', Validators.required],
      cargo: ['', Validators.required],
      salario:  ['', Validators.required],      
      valorHorasExtras: ['', Validators.required],
      fondosReserva: ['', Validators.required],
      totalIngresos: ['', Validators.required],
      iess: ['', Validators.required],
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
    this.esEditar();
  }



sePagaFondoReserva(){
  var fondoReserva = "No";

  if(this.rolIndividualForm.get('fondosReserva')?.value!=="0.00"){
    fondoReserva="Si";
  }

  return fondoReserva;
}

horasExtras(){
  var horasExtras = "0";

  if(this.rolIndividualForm.get('valorHorasExtras')?.value!="0.00"){
    horasExtras="1";
  }

  return horasExtras;
}


  agregarRolIndividual() {
    
    var fondoReserva: string= this.sePagaFondoReserva();
    var horasExtras: string= this.horasExtras();
    const ROL_INDIVIDUAL: NominaPagoMenosInfo = {

      cedula: this.rolIndividualForm.get('cedula')?.value,
      nomina: this.rolIndividualForm.get('nomina')?.value,
      cargo: this.rolIndividualForm.get('cargo')?.value,
      salario: this.rolIndividualForm.get('salario')?.value,
      numHorasExtras: horasExtras.toString(),
      valorHorasExtras: this.rolIndividualForm.get('valorHorasExtras')?.value,
      sePagaFondosReserva: fondoReserva.toString(),
      fondosReserva: this.rolIndividualForm.get('fondosReserva')?.value,
      totalIngresos: this.rolIndividualForm.get('totalIngresos')?.value,
      iess: this.rolIndividualForm.get('iess')?.value,
      anticipo: this.rolIndividualForm.get('anticipo')?.value,
      prestamoIess: this.rolIndividualForm.get('prestamoIess')?.value,
      totalEgreso: this.rolIndividualForm.get('totalEgreso')?.value,
      liquidoRecibir: this.rolIndividualForm.get('liquidoRecibir')?.value      
    }




    this._nominaPagoService.comprobarIdNominaPago(this.id, this.anho, this.mes).subscribe(data => {

      if(data=="Si"){
        //editamos nomina
        this._nominaPagoService.editarNominaPago(this.id, ROL_INDIVIDUAL, this.anho, this.mes).subscribe(data => {
          this.toastr.success('La nómina de pago fue registrada con éxito!', 'Nomina de pago Registrada!');
          this.router.navigate(['/nomina-pagos']);
        }, error => {
          console.log(error);        
          this.mensaje = error.error;
        })
      }else{
        

        this._nominaPagoService.obtenerCedula(this.id).subscribe(data => {
          
          this._nominaPagoService.guardarNominaPago(ROL_INDIVIDUAL,this.anho,this.mes,data.toString()).subscribe(data => {
            this.toastr.success('La nómina de pago fue registrada con éxito!', 'Nomina de pago Registrada!');
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


        
  }


  esEditar() {
    if (this.id !== null) {
      

      this._nominaPagoService.obtenerNominaPago(this.id, this.anho, this.mes).subscribe(data => {        
        console.log(data);
        this.rolIndividualForm.setValue({
          cedula: data.cedula,
          nomina: data.nomina,
          cargo: data.cargo,   
          salario: data.salario,                 
          valorHorasExtras: data.valorHorasExtras,          
          fondosReserva: data.fondosReserva,
          totalIngresos: data.totalIngresos,
          iess: data.iess,
          anticipo: data.anticipo,
          prestamoIess: data.prestamoIess,
          totalEgreso: data.totalEgreso,
          liquidoRecibir: data.liquidoRecibir
        })
      })
    }
  }

  obtenerCedula(id: any) {
    var cedulita ="";
    this._nominaPagoService.obtenerCedula(id).subscribe(data => {
      
      cedulita= data.toString();
      

    }, error => {
      console.log(error);
    })
return cedulita;

  }




}

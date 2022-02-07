import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/services/must-match.validator';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/model/empleado';
import { HoraExtra } from 'src/app/model/horaExtra';
import { HoraExtraService } from 'src/app/services/hora-extra.service';

@Component({
  selector: 'app-crear-hora-extra',
  templateUrl: './crear-hora-extra.component.html',
  styleUrls: ['./crear-hora-extra.component.css']
})
export class CrearHoraExtraComponent implements OnInit {

  horaExtraForm: FormGroup;
  titulo = 'Generar Hora Extra';
  id: string | null;
  mensaje: string = "";
  listEmpleados: Empleado[] = [];
  emple = [{"nombre":""}];
  cedEmple  = "";
  nombreSelec = "";
  anho = "";
  mes = "";
  valFinal = "";
  fhoy = new Date(Date.now());
  
  hoy = this.fhoy.toLocaleDateString('en-GB').split('/').reverse().join('-');

  constructor(private _horaExtraService: HoraExtraService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _empleadoService: EmpleadoService,
    private aRouter: ActivatedRoute) {

      this.horaExtraForm = this.fb.group({
        nombreEmpleado: ['', Validators.required],
        cedulaEmpleado: [''],
        cantidadHoras: ['', Validators.required],
        valorXHora: ['', Validators.required],
        valorFinalHoras: [''],
        fechaHoraExtra: ['', Validators.required]
      });
      this.id = this.aRouter.snapshot.paramMap.get('id');

     }

  ngOnInit(): void {
    this._empleadoService.getEmpleados().subscribe(res =>{      
      this.emple=res;
      }, err => console.log(err))

      this.valFinal=(parseFloat(this.horaExtraForm.get('valorXHora')?.value)
      *parseFloat(this.horaExtraForm.get('cantidadHoras')?.value)).toString();


  this.esEditar();
  this.ponerCedula();
  //this.calcularValorFinal();
  }

  agregarHoraExtra() {
    const HORAEXTRA: HoraExtra = {
    cedulaEmpleado: this.cedEmple,
    cantidadHoras: this.horaExtraForm.get('cantidadHoras')?.value,
    valorXHora: this.horaExtraForm.get('valorXHora')?.value,
    valorFinalHoras: this.valFinal,
    fechaHoraExtra: this.horaExtraForm.get('fechaHoraExtra')?.value
  }
  
  let fecha: Date = new Date(this.horaExtraForm.get('fechaHoraExtra')?.value.concat('T00:00:00'))
  let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  this.anho = fecha.getFullYear().toString();
  this.mes = meses[fecha.getUTCMonth()];
  

  if (this.id !== null) {
    //editamos hora extra
    this._horaExtraService.editarHoraExtra(this.id, HORAEXTRA, this.anho, this.mes).subscribe(data => {  /************* */
      this.toastr.success('La hora extra fue actualizada con éxito!', 'Hora Extra Actualizada!');
      this.router.navigate(['/horas-extra']);
    }, error => {
      console.log(error);
      this.mensaje = error.error;
    })
  } else {
    //agregamos hora extra
    console.log(HORAEXTRA);
    this._horaExtraService.guardarHoraExtra(HORAEXTRA, this.anho, this.mes).subscribe(data => { /*************** */
      this.toastr.success('La hora extra fue registrada con éxito!', 'Hora Extra Registrada!');
      this.router.navigate(['/horas-extra']);
    }, error => {
      console.log(error);
      this.mensaje = error.error;
    })
  }
}

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Hora Extra';
      this._horaExtraService.obtenerHoraExtra(this.id,this.anho,this.mes).subscribe(data => { /*********** */
        this.horaExtraForm.setValue({

          cedulaEmpleado: data.cedulaEmpleado,
          cantidadHoras: data.cantidadHoras,
          valorXHora: data.valorXHora,
          valorFinalHoras: data.valorFinalHoras,
          fechaHoraExtra: data.fechaHoraExtra

        })
      })
    }
  }

  ponerCedula(){
    const selectElementNombre = document.getElementById('selectNombre');

    if (selectElementNombre === null) {
      this.cedEmple = "";

    } else {
      selectElementNombre.addEventListener('change', (event) => {
        this.nombreSelec = (<HTMLInputElement>selectElementNombre).value;
        this.obtenerEmpleados();
      });
    }
  }


  obtenerEmpleados() {

    this._empleadoService.getEmpleados().subscribe(data => {
      console.log(data);

      this.listEmpleados = data;
      this.listEmpleados.forEach(element => {

        if (element.nombre == this.nombreSelec) {
          this.cedEmple = element.cedula;
        }
      });

    }, error => {
      console.log(error);
    })
  }

  calcularValorFinal(){
    
    this.valFinal=(parseFloat(this.horaExtraForm.get('valorXHora')?.value)*parseInt(this.horaExtraForm.get('cantidadHoras')?.value)).toString();

  }

  
  
}
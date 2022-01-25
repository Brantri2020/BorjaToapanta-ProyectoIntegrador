import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from 'src/app/model/empleado';
import { MustMatch } from 'src/app/services/must-match.validator';
import { EmpleadoService } from 'src/app/services/empleado.service';


@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {

  empleadoForm: FormGroup;
  titulo = 'Crear Empleado';
  id: string | null;
  mensaje: string = "";

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _empleadoService: EmpleadoService,
    private aRouter: ActivatedRoute) {

      this.empleadoForm = this.fb.group({
        cedula: ['', Validators.required],
        nombre: ['', Validators.required],
        cargo: ['', Validators.required],
        salario: ['', Validators.required],
        numeroCuenta: ['', Validators.required],
        tipoCuenta: ['', Validators.required],
        institucionFinanciera: ['', Validators.required]
      });
      this.id = this.aRouter.snapshot.paramMap.get('id');

     }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEmpleado() {
    const EMPLEADO: Empleado = {
      cedula: this.empleadoForm.get('cedula')?.value,
      nombre: this.empleadoForm.get('nombre')?.value,
      cargo: this.empleadoForm.get('cargo')?.value,
      salario: this.empleadoForm.get('salario')?.value,
      numeroCuenta: this.empleadoForm.get('numeroCuenta')?.value,
      tipoCuenta: this.empleadoForm.get('tipoCuenta')?.value,
      institucionFinanciera: this.empleadoForm.get('institucionFinanciera')?.value
    }
    if (this.id !== null) {
      //editamos empleado
      this._empleadoService.editarEmpleado(this.id, EMPLEADO).subscribe(data => {
        this.toastr.success('El empleado fue actualizado con éxito!', 'Empleado Actualizado!');
        this.router.navigate(['/empleados']);
      }, error => {
        console.log(error);
        window.alert("HIII");
        this.mensaje = error.error;
      })
    } else {
      //agregamos empleado
      console.log(EMPLEADO);
      this._empleadoService.guardarEmpleado(EMPLEADO).subscribe(data => {
        this.toastr.success('El empleado fue registrado con éxito!', 'Empleado Registrado!');
        this.router.navigate(['/empleados']);
      }, error => {
        console.log(error);
        this.mensaje = error.error;
      })
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Empleado';
      this._empleadoService.obtenerEmpleado(this.id).subscribe(data => {
        this.empleadoForm.setValue({

          cedula: data.cedula,
          nombre: data.nombre,
          cargo: data.cargo,
          salario: data.salario,
          numeroCuenta: data.numeroCuenta,
          tipoCuenta: data.tipoCuenta,
          institucionFinanciera: data.institucionFinanciera


        })
      })
    }
  }

  /*confirmarVolver(){
    var resultado = window.confirm('¿Estás seguro de volver?');
  if (resultado === true) {
    this.router.navigate(['/empleados']);
  } else { 
      this.agregarEmpleado();
  }

  }
*/

}

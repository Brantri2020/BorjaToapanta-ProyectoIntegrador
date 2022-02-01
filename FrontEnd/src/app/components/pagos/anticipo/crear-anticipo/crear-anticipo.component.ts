import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/services/must-match.validator';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/model/empleado';
import { Anticipo } from 'src/app/model/anticipo';
import { AnticipoService } from 'src/app/services/anticipo.service';


@Component({
  selector: 'app-crear-anticipo',
  templateUrl: './crear-anticipo.component.html',
  styleUrls: ['./crear-anticipo.component.css']
})
export class CrearAnticipoComponent implements OnInit {

  anticipoForm: FormGroup;
  titulo = 'Generar Anticipo';
  id: string | null;
  mensaje: string = "";
  listEmpleados: Empleado[] = [];
  emple = [{"cedula":""},{"nombre":""}];
  //salario2: string[] = [];

  constructor(private _anticipoService: AnticipoService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _empleadoService: EmpleadoService,
    private aRouter: ActivatedRoute) {

      this.anticipoForm = this.fb.group({
        cedulaEmpleado: ['', Validators.required],
        valorAnticipo: ['', Validators.required],
        fechaAnticipo: ['', Validators.required]
      });
      this.id = this.aRouter.snapshot.paramMap.get('id');

     }
     

    

  ngOnInit(): void {
      //obtener salarios
        this._empleadoService.getEmpleados().subscribe(res =>{      
        this.emple=res;
        }, err => console.log(err))


    this.esEditar();
  }


  agregarAnticipo() {

    

    const ANTICIPO: Anticipo = {
    cedulaEmpleado: this.anticipoForm.get('cedulaEmpleado')?.value,
    valorAnticipo: this.anticipoForm.get('valorAnticipo')?.value,
    fechaAnticipo: this.anticipoForm.get('fechaAnticipo')?.value
  }
  if (this.id !== null) {
    //editamos anticipo
    this._anticipoService.editarAnticipo(this.id, ANTICIPO, this.mensaje, this.mensaje).subscribe(data => {  /************* */
      this.toastr.success('El anticipo fue actualizado con éxito!', 'Anticipo Actualizado!');
      this.router.navigate(['/anticipos']);
    }, error => {
      console.log(error);
      window.alert("HIII");
      this.mensaje = error.error;
    })
  } else {
    //agregamos empleado
    console.log(ANTICIPO);
    this._anticipoService.guardarAnticipo(ANTICIPO, this.mensaje, this.mensaje).subscribe(data => { /*************** */
      this.toastr.success('El anticipo fue registrado con éxito!', 'Anticipo Registrado!');
      this.router.navigate(['/anticipos']);
    }, error => {
      console.log(error);
      this.mensaje = error.error;
    })
  }
}

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Anticipo';
      this._anticipoService.obtenerAnticipo(this.id,this.mensaje,this.mensaje).subscribe(data => { /*********** */
        this.anticipoForm.setValue({

          cedulaEmpleado: data.cedulaEmpleado,
          valorAnticipo: data.valorAnticipo,
          fechaAnticipo: data.fechaAnticipo

        })
      })
    }
  }

  
  
}
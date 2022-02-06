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
  emple = [{"nombre":""}];
  cedEmple  = "";
  nombreSelec = "";
  anho = "";
  mes = "";
  mes1 = "";
  
  
  //salario2: string[] = [];

  constructor(private _anticipoService: AnticipoService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _empleadoService: EmpleadoService,
    private aRouter: ActivatedRoute) {

      this.anticipoForm = this.fb.group({
        nombreEmpleado: ['', Validators.required],
        cedulaEmpleado: [''],
        valorAnticipo: ['', Validators.required],
        fechaAnticipo: ['', Validators.required]
      });
      this.id = this.aRouter.snapshot.paramMap.get('id');

     }
     

    

  ngOnInit(): void {
      //obtener empleados
        this._empleadoService.getEmpleados().subscribe(res =>{      
        this.emple=res;
        }, err => console.log(err))


    this.esEditar();
    this.ponerCedula();
  }


  agregarAnticipo() {
    const ANTICIPO: Anticipo = {
    cedulaEmpleado: this.cedEmple,
    valorAnticipo: this.anticipoForm.get('valorAnticipo')?.value,
    fechaAnticipo: this.anticipoForm.get('fechaAnticipo')?.value
  }
  const fecha = new Date(this.anticipoForm.get('fechaAnticipo')?.value);
  this.anho = fecha.getFullYear().toString();
  this.mes1 = (fecha.getMonth()+1).toString();
  if (this.mes1 == "1"){
    this.mes = "Enero";
  }else if (this.mes1 == "2"){
    this.mes = "Febrero";
  }else if (this.mes1 == "3"){
    this.mes = "Marzo";
  }else if (this.mes1 == "4"){
    this.mes = "Abril";
  }else if (this.mes1 == "5"){
    this.mes = "Mayo";
  }else if (this.mes1 == "6"){
    this.mes = "Junio";
  }else if (this.mes1 == "7"){
    this.mes = "Julio";
  }else if (this.mes1 == "8"){
    this.mes = "Agosto";
  }else if (this.mes1 == "9"){
    this.mes = "Septiembre";
  }else if (this.mes1 == "10"){
    this.mes = "Octubre";
  }else if (this.mes1 == "11"){
    this.mes = "Noviembre";
  }else{
    this.mes = "Diciembre";
  }

  if (this.id !== null) {
    //editamos anticipo
    this._anticipoService.editarAnticipo(this.id, ANTICIPO, this.anho, this.mes).subscribe(data => {  /************* */
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
    this._anticipoService.guardarAnticipo(ANTICIPO, this.anho, this.mes).subscribe(data => { /*************** */
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
      this._anticipoService.obtenerAnticipo(this.id,this.anho,this.mes).subscribe(data => { /*********** */
        this.anticipoForm.setValue({

          cedulaEmpleado: data.cedulaEmpleado,
          valorAnticipo: data.valorAnticipo,
          fechaAnticipo: data.fechaAnticipo

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

  
  
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/services/must-match.validator';
import { Anticipo } from 'src/app/model/anticipo';
import { AnticipoService } from 'src/app/services/anticipo.service';


@Component({
  selector: 'app-actualizar-anticipo',
  templateUrl: './actualizar-anticipo.component.html',
  styleUrls: ['./actualizar-anticipo.component.css']
})
export class ActualizarAnticipoComponent implements OnInit {

  anticipoForm: FormGroup;
  titulo = 'Editar Anticipo';
  id: string | null;
  mensaje: string = "";
  
  
  
  
  anho = "";
  mes = "";
  fhoy = new Date(Date.now());
  
  hoy = this.fhoy.toLocaleDateString('en-GB').split('/').reverse().join('-');
  
  
  

  constructor(private _anticipoService: AnticipoService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {

      this.anticipoForm = this.fb.group({
        cedulaEmpleado: [''],
        nombreEmpleado: ['', Validators.required],
        valorAnticipo: ['', Validators.required],
        fechaAnticipo: ['', Validators.required]
      });
      this.id = this.aRouter.snapshot.paramMap.get('id');

     }
     
     

    

  ngOnInit(): void {

    


    this.esEditar();
  }


  agregarAnticipo() {
    const ANTICIPO: Anticipo = {
    cedulaEmpleado: this.anticipoForm.get('cedulaEmpleado')?.value,
    nombreEmpleado: this.anticipoForm.get('nombreEmpleado')?.value,
    valorAnticipo: this.anticipoForm.get('valorAnticipo')?.value,
    fechaAnticipo: this.anticipoForm.get('fechaAnticipo')?.value
  }
  
  let fecha: Date = new Date(this.anticipoForm.get('fechaAnticipo')?.value.concat('T00:00:00'))
  let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  this.anho = fecha.getFullYear().toString();
  this.mes = meses[fecha.getUTCMonth()];
  

  if (this.id !== null) {
    //poner nombre

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
    
  }
}

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Anticipo';
      this._anticipoService.obtenerAnticipo(this.id,this.anho,this.mes).subscribe(data => { /*********** */
        this.anticipoForm.setValue({

          cedulaEmpleado: data.cedulaEmpleado,
          nombreEmpleado: data.nombreEmpleado,
          valorAnticipo: data.valorAnticipo,
          fechaAnticipo: data.fechaAnticipo

        })

        
      })
    }
  }

  

  
  
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Salario } from 'src/app/model/salario';
import { MustMatch } from 'src/app/services/must-match.validator';
import { SalarioService } from 'src/app/services/salario.service';

@Component({
  selector: 'app-crear-salario',
  templateUrl: './crear-salario.component.html',
  styleUrls: ['./crear-salario.component.css']
})
export class CrearSalarioComponent implements OnInit {

  salarioForm: FormGroup;
  titulo = 'Crear Salario';
  id: string | null;
  mensaje: string = "";

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _salarioService: SalarioService,
    private aRouter: ActivatedRoute) {

      this.salarioForm = this.fb.group({
        cargo: ['', Validators.required],
        salario: ['', Validators.required]
      });
      this.id = this.aRouter.snapshot.paramMap.get('id');

     }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarSalario() {
    const SALARIO: Salario = {
      cargo: this.salarioForm.get('cargo')?.value,
      salario: this.salarioForm.get('salario')?.value
    }
    if (this.id !== null) {
      //editamos salario
      this._salarioService.editarSalario(this.id, SALARIO).subscribe(data => {
        this.toastr.success('El Salario fue actualizado con éxito!', 'Salario Actualizado!');
        this.router.navigate(['/salarios']);
      }, error => {
        console.log(error);
        this.mensaje = error.error;
      })
    } else {
      //agregamos salario
      console.log(SALARIO);
      this._salarioService.guardarSalario(SALARIO).subscribe(data => {
        this.toastr.success('El salario fue registrado con éxito!', 'Salario Registrado!');
        this.router.navigate(['/salarios']);
      }, error => {
        console.log(error);
        this.mensaje = error.error;
      })
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Salario';
      this._salarioService.obtenerSalario(this.id).subscribe(data => {
        this.salarioForm.setValue({

          cargo: data.cargo,
          salario: data.salario


        })
      })
    }
  }

  

  


}

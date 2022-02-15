import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Porcentaje } from 'src/app/model/porcentaje';
import { MustMatch } from 'src/app/services/must-match.validator';
import { PorcentajesService } from 'src/app/services/porcentajes.service';

@Component({
  selector: 'app-crear-porcentajes',
  templateUrl: './crear-porcentajes.component.html',
  styleUrls: ['./crear-porcentajes.component.css']
})
export class CrearPorcentajesComponent implements OnInit {

  porcentajeForm: FormGroup;
  titulo = 'Crear porcentaje';
  id: string | null;
  anho: string | null;
  mes: string | null;
  mensaje: string = "";
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _porcentajeService: PorcentajesService,
    private aRouter: ActivatedRoute) {

    this.porcentajeForm = this.fb.group({
      tipoPorcentaje: ['', Validators.required],
      porcentaje: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.anho = this.aRouter.snapshot.paramMap.get('anho');
    this.mes = this.aRouter.snapshot.paramMap.get('mes');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarPorcentaje() {
    const PORCENTAJE: Porcentaje = {
      tipoPorcentaje: this.porcentajeForm.get('tipoPorcentaje')?.value,
      porcentaje: this.porcentajeForm.get('porcentaje')?.value,
    }
    if (this.id !== null) {
      //editamos porcentaje
      
      this._porcentajeService.editarPorcentaje(this.id, PORCENTAJE, this.anho, this.mes).subscribe(data => {
        this.toastr.success('El porcentaje fue actualizado con éxito!', 'Porcentaje Actualizado!');
        this.router.navigate(['/porcentajes']);
      }, error => {
        console.log(error);        
        this.mensaje = error.error;
      })
      
    } else {
      //agregamos porcentaje      
      this._porcentajeService.guardarPorcentaje(PORCENTAJE, this.anho, this.mes).subscribe(data => {
        this.toastr.success('El porcentaje fue registrado con éxito!', 'Porcentaje Registrado!');
        this.router.navigate(['/porcentajes']);
      }, error => {
        console.log(error);
        this.mensaje = error.error;
      })
    }
  }

    esEditar() {
      if (this.id !== null) {
        this.titulo = 'Editar porcentaje';
        this._porcentajeService.obtenerPorcentaje(this.id, this.anho, this.mes).subscribe(data => {
          this.porcentajeForm.setValue({
            tipoPorcentaje: data.tipoPorcentaje,
            porcentaje: data.porcentaje       
          })
        })
      }
    }
  
}
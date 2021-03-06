import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proveedor } from 'src/app/model/proveedor';
import { MustMatch } from 'src/app/services/must-match.validator';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.css']
})
export class CrearProveedorComponent implements OnInit {

  proveedorForm: FormGroup;
  titulo = 'Crear proveedor';
  id: string | null;
  mensaje: string = "";
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _proveedorService: ProveedorService,
    private aRouter: ActivatedRoute) {

      this.proveedorForm = this.fb.group({
        ruc: ['', Validators.required],
        nombre: ['', Validators.required],
        cuenta: ['', Validators.required],
        banco: ['', Validators.required],
        tipoCuenta: [''],
        telefonoCelular: [''],
        telefonoConvencional: [''],
        correo: ['']
      });
      this.id = this.aRouter.snapshot.paramMap.get('id');

     }

  ngOnInit(): void {
    this.esEditar();
  }





  agregarProveedor() {
    const PROVEEDOR: Proveedor = {
      ruc: this.proveedorForm.get('ruc')?.value,
      nombre: this.proveedorForm.get('nombre')?.value,
      cuenta: this.proveedorForm.get('cuenta')?.value,
      banco: this.proveedorForm.get('banco')?.value,
      tipoCuenta: this.proveedorForm.get('tipoCuenta')?.value,
      telefonoCelular: this.proveedorForm.get('telefonoCelular')?.value,
      telefonoConvencional: this.proveedorForm.get('telefonoConvencional')?.value,
      correo: this.proveedorForm.get('correo')?.value
    }
    if (this.id !== null) {
      //editamos proveedor
      this._proveedorService.editarProveedor(this.id, PROVEEDOR).subscribe(data => {
        this.toastr.success('El proveedor fue actualizado con ??xito!', 'Proveedor Actualizado!');
        this.router.navigate(['/proveedores']);
      }, error => {
        console.log(error);
        window.alert("HIII");
        this.mensaje = error.error;
      })
    } else {
      //agregamos proveedor
      console.log(PROVEEDOR);
      this._proveedorService.guardarProveedor(PROVEEDOR).subscribe(data => {
        this.toastr.success('El proveedor fue registrado con ??xito!', 'Proveedor Registrado!');
        this.router.navigate(['/proveedores']);
      }, error => {
        console.log(error);
        this.mensaje = error.error;
      })
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar proveedor';
      this._proveedorService.obtenerProveedor(this.id).subscribe(data => {
        this.proveedorForm.setValue({

          ruc: data.ruc,
          nombre: data.nombre,
          cuenta: data.cuenta,
          banco: data.banco,
          tipoCuenta: data.tipoCuenta,
          telefonoCelular: data.telefonoCelular,
          telefonoConvencional: data.telefonoConvencional,
          correo: data.correo


        })
      })
    }
  }




}
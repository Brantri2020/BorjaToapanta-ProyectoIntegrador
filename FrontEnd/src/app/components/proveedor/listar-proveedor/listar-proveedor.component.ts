import { Component, OnInit, Provider } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Proveedor } from 'src/app/model/proveedor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-listar-proveedor',
  templateUrl: './listar-proveedor.component.html',
  styleUrls: ['./listar-proveedor.component.css']
})
export class ListarProveedorComponent implements OnInit {
  busquedaProvForm: FormGroup;
  listProveedores: Proveedor[] = [];
  listProveedores2: Proveedor[] = [];
  i=0;
  constructor(private _proveedorService: ProveedorService,
    private toastr: ToastrService,
    private fb: FormBuilder) {
      this.busquedaProvForm = this.fb.group({
        busqueda: ['', Validators.required]
      });
     }

  ngOnInit(): void {
    this.obtenerProveedores();
  }


  buscarProveedor() {
    if(this.busquedaProvForm.get('busqueda')?.value==""){
      this.obtenerProveedores();
    }else{
    this._proveedorService.buscarProveedor(this.busquedaProvForm.get('busqueda')?.value).subscribe(data => {      
      this.listProveedores = data;
      

    }, error => {
      console.log(error);
    })
  }

  
}

obtenerProveedores(){
  this._proveedorService.getProveedores().subscribe(data =>{
    console.log(data);
    this.listProveedores= data;
  
  },error =>{
    console.log(error);
  })
}


eliminarProveedor(id:any){
  
  this._proveedorService.eliminarProveedor(id).subscribe(data => {
    this.toastr.error('El proveedor fue eliminado con éxito', 'Proveedor eliminado');
    this.obtenerProveedores();

  }, error =>{
    console.log(error);
  })
}



}









/*
  
  

  

  ordenar(filtro: string) {
    this._usuarioService.getUsuariosOrdenado(filtro).subscribe(data => {
      
      this.i++;
      if(this.i % 2 == 0){
        
        this.listUsuarios2 = data;
        this.listUsuarios = this.listUsuarios2.slice().reverse();
      }else{
        
        this.listUsuarios = data;
      }
      


    }, error => {
      console.log(error);
    })
  }


}
*/
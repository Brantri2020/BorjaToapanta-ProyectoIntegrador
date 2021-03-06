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
        busqueda: ['',]
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
  
  

  var resultado = window.confirm('¿Estas seguro de eliminar el proveedor?');
  if (resultado === true) {
    this._proveedorService.eliminarProveedor(id).subscribe(data => {
      this.toastr.error('El proveedor fue eliminado con éxito', 'Proveedor eliminado');
      this.obtenerProveedores();
  
    }, error =>{
      console.log(error);
    })
  } else { 
      this.toastr.warning('No se realizó ningún cambio', 'NO eliminado');
      this.obtenerProveedores();
  }

}

ordenarProveedor(filtro: any) {
  this.i++;
  this._proveedorService.obtenerProveedorOrdenado(filtro).subscribe(data => {      
    if(this.i % 2==1){
      this.listProveedores = data;
      
    }else{
      this.listProveedores2 = data;
      this.listProveedores = this.listProveedores2.slice().reverse();
    }
  }, error => {
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
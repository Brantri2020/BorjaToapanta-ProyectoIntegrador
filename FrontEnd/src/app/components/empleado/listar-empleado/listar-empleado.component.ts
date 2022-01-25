import { Component, OnInit, Provider } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Empleado } from 'src/app/model/empleado';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css']
})
export class ListarEmpleadoComponent implements OnInit {
  busquedaEmpForm: FormGroup;
  listEmpleados: Empleado[] = [];
  listEmpleados2: Empleado[] = [];
  i=0;

  

  constructor(private _empleadoService: EmpleadoService,
    private toastr: ToastrService,
    private fb: FormBuilder) {
      this.busquedaEmpForm = this.fb.group({
        busqueda: ['',]
      });
     }

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  buscarEmpleado() {
    if(this.busquedaEmpForm.get('busqueda')?.value==""){
      
      this.obtenerEmpleados();
    }else{
    this._empleadoService.buscarEmpleado(this.busquedaEmpForm.get('busqueda')?.value).subscribe(data => {      
      this.listEmpleados = data;
    }, error => {
      console.log(error);
    })
  }

}

obtenerEmpleados(){
  this._empleadoService.getEmpleados().subscribe(data =>{
    console.log(data);
    this.listEmpleados= data;
  
  },error =>{
    console.log(error);
  })
}


eliminarEmpleado(id:any){
  
  this._empleadoService.eliminarEmpleado(id).subscribe(data => {
    this.toastr.error('El empleado fue eliminado con éxito', 'Empleado eliminado');
    this.obtenerEmpleados();

  }, error =>{
    console.log(error);
  })
}

ordenarEmpleado(filtro: any) {
  this.i++;
  this._empleadoService.obtenerEmpleadoOrdenado(filtro).subscribe(data => {      
    if(this.i % 2==1){
      this.listEmpleados = data;
      
    }else{
      this.listEmpleados2 = data;
      this.listEmpleados = this.listEmpleados2.slice().reverse();
    }
  }, error => {
    console.log(error);
  })
}



}

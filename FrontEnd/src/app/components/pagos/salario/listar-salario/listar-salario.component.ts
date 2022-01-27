import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Salario } from 'src/app/model/salario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalarioService } from 'src/app/services/salario.service';

@Component({
  selector: 'app-listar-salario',
  templateUrl: './listar-salario.component.html',
  styleUrls: ['./listar-salario.component.css']
})
export class ListarSalarioComponent implements OnInit {

  busquedaSalarioForm: FormGroup;
  listSalarios: Salario[] = [];
  listSalarios2: Salario[] = [];
  i=0;

  constructor(private _salarioService: SalarioService,
    private toastr: ToastrService,
    private fb: FormBuilder) {
    this.busquedaSalarioForm = this.fb.group({
      busqueda: ['',]
    });
  }

  ngOnInit(): void {
    this.obtenerSalarios();
  }

  buscarSalario() {
    if(this.busquedaSalarioForm.get('busqueda')?.value==""){
      
      this.obtenerSalarios();
    }else{
    this._salarioService.buscarSalario(this.busquedaSalarioForm.get('busqueda')?.value).subscribe(data => {      
      this.listSalarios = data;
    }, error => {
      console.log(error);
    })
  } 

}


  obtenerSalarios(){
    this._salarioService.getSalarios().subscribe(data =>{
      console.log(data);
      this.listSalarios= data;
    
    },error =>{
      console.log(error);
    })
  }
  
  
  eliminarSalario(id:any){
    
    var resultado = window.confirm('¿Estas seguro de eliminar el salario?');
    if (resultado === true) {
      this._salarioService.eliminarSalario(id).subscribe(data => {
        this.toastr.error('El salario fue eliminado con éxito', 'Salario eliminado');
        this.obtenerSalarios();
        }, error =>{
          console.log(error);
        })
    } else { 
        this.toastr.warning('No se realizó ningún cambio', 'NO eliminado');
        this.obtenerSalarios();
    }
  
    
  }
  
  
  ordenarSalario(filtro: any) {
    this.i++;
    this._salarioService.obtenerSalarioOrdenado(filtro).subscribe(data => {      
      if(this.i % 2==1){
        this.listSalarios = data;
        
      }else{
        this.listSalarios2 = data;
        this.listSalarios = this.listSalarios2.slice().reverse();
      }
    }, error => {
      console.log(error);
    })
  }  
  
  


}
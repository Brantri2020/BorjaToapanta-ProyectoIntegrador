import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  nombre: any;

  
  

  constructor( public authService: AuthService,
    public usuarioService: UsuarioService,
    public router: Router,
    public ngZone: NgZone) { }

  ngOnInit(): void {
    this.expandirColapsarMenu();    
    this.llenarNombre();
  }

  llenarNombre(){
    const user = JSON.parse(localStorage.getItem('user')|| '{}');      
    
    this.usuarioService.buscarNombre(user.email).subscribe(data => {      
      
      this.nombre=data;
      

    }, error => {
      console.log(error);
    })

  }

  expandirColapsarMenu(){
      
    const btn = document.querySelector('#menu-btn');
    const menu = document.querySelector('#sidemenu');
    
    btn?.addEventListener('click', e => {
      
      menu?.classList.toggle("menu-collapsed");
      menu?.classList.toggle("menu-expanded");
    
      document.querySelector('body')?.classList.toggle('body-expanded');
    
    
    });
    
  }

}

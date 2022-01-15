import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor( public authService: AuthService,
    public router: Router,
    public ngZone: NgZone) { }

  ngOnInit(): void {

       
const btn = document.querySelector('#menu-btn');
const menu = document.querySelector('#sidemenu');

btn?.addEventListener('click', e => {
  menu?.classList.toggle("menu-expanded");
  menu?.classList.toggle("menu-collapsed");

  document.querySelector('body')?.classList.toggle('body-expanded');


});

  }

}

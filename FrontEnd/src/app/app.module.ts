import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as $ from 'jquery';

// Reactive Form
import { ReactiveFormsModule } from "@angular/forms";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/usuarios/dashboard/dashboard.component';
import { SignInComponent } from './components/usuarios/sign-in/sign-in.component';
import { SignUpComponent } from './components/usuarios/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/usuarios/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/usuarios/verify-email/verify-email.component';
import { AuthService } from './services/auth-service.service';
import { ProveedorService } from './services/proveedor.service';
import { NominaPagoService } from './services/nomina-pago.service';
import { UsuarioService } from './services/usuario.service';
import { PorcentajesService } from './services/porcentajes.service';

import { UserGmailComponent } from './components/usuarios/user-gmail/user-gmail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CrearProveedorComponent } from './components/proveedor/crear-proveedor/crear-proveedor.component';
import { ListarProveedorComponent } from './components/proveedor/listar-proveedor/listar-proveedor.component';
import { MenuComponent } from './components/menu/menu.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NominaPagosComponent } from './components/pagos/nomina-pagos/nomina-pagos.component';
import { RolIndividualComponent } from './components/pagos/rol-individual/rol-individual.component';
import { ListarEmpleadoComponent } from './components/empleado/listar-empleado/listar-empleado.component';
import { CrearEmpleadoComponent } from './components/empleado/crear-empleado/crear-empleado.component';
import { ListarSalarioComponent } from './components/pagos/salario/listar-salario/listar-salario.component';
import { CrearSalarioComponent } from './components/pagos/salario/crear-salario/crear-salario.component';
import { ListarAnticipoComponent } from './components/pagos/anticipo/listar-anticipo/listar-anticipo.component';
import { CrearAnticipoComponent } from './components/pagos/anticipo/crear-anticipo/crear-anticipo.component';
import { ListarHoraExtraComponent } from './components/pagos/hora-extra/listar-hora-extra/listar-hora-extra.component';
import { CrearHoraExtraComponent } from './components/pagos/hora-extra/crear-hora-extra/crear-hora-extra.component';

import { CrearPorcentajesComponent } from './components/pagos/porcentajes/crear-porcentajes/crear-porcentajes.component';
import { ListarPorcentajesComponent } from './components/pagos/porcentajes/listar-porcentajes/listar-porcentajes.component';
import { CrearEventoComponent } from './components/eventos/crear-evento/crear-evento.component';
import { ListarEventoComponent } from './components/eventos/listar-evento/listar-evento.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    UserGmailComponent,
    CrearProveedorComponent,
    ListarProveedorComponent,
    MenuComponent,
    InicioComponent,
    RolIndividualComponent,
    InicioComponent,
    ListarEmpleadoComponent,
    CrearEmpleadoComponent,
    NominaPagosComponent,
    ListarSalarioComponent,
    CrearSalarioComponent,
    ListarAnticipoComponent,
    CrearAnticipoComponent,
    ListarHoraExtraComponent,
    CrearHoraExtraComponent,
    CrearPorcentajesComponent,
    ListarPorcentajesComponent,
    CrearEventoComponent,
    ListarEventoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],


  providers: [AuthService, ProveedorService, UsuarioService, NominaPagoService, PorcentajesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

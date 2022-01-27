import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    CrearSalarioComponent
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


  providers: [AuthService, ProveedorService, UsuarioService, NominaPagoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

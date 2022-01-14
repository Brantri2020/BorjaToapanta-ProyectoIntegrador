import { NgModule } from '@angular/core';
// Required services for navigation
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated 
import { SignInComponent } from '../app/components/usuarios/sign-in/sign-in.component';
import { SignUpComponent } from '../app/components/usuarios/sign-up/sign-up.component';
import { DashboardComponent } from '../app/components/usuarios/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../app/components/usuarios/forgot-password/forgot-password.component';
import { AuthGuard } from "../app/guard/auth.guard";
import { VerifyEmailComponent } from '../app/components/usuarios/verify-email/verify-email.component';
import { UserGmailComponent } from './components/usuarios/user-gmail/user-gmail.component';
import { CrearProveedorComponent } from './components/proveedor/crear-proveedor/crear-proveedor.component';
import { ListarProveedorComponent } from './components/proveedor/listar-proveedor/listar-proveedor.component';


const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent},
  { path: 'register-user', component: SignUpComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'user-gmail', component: UserGmailComponent },
  { path: 'nuevo-proveedor', component: CrearProveedorComponent, canActivate: [AuthGuard] },
  { path: 'editar-proveedor/:id', component: CrearProveedorComponent, canActivate: [AuthGuard] },
  { path: 'proveedores', component: ListarProveedorComponent, canActivate: [AuthGuard] }
  

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
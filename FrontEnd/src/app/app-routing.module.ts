import { NgModule } from '@angular/core';
// Required services for navigation
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated 
import { SignInComponent } from '../app/components/usuarios/sign-in/sign-in.component';
import { SignUpComponent } from '../app/components/usuarios/sign-up/sign-up.component';
import { InicioComponent } from '../app/components/inicio/inicio.component';
import { ForgotPasswordComponent } from '../app/components/usuarios/forgot-password/forgot-password.component';
import { AuthGuard } from "../app/guard/auth.guard";
import { VerifyEmailComponent } from '../app/components/usuarios/verify-email/verify-email.component';
import { UserGmailComponent } from './components/usuarios/user-gmail/user-gmail.component';
import { CrearProveedorComponent } from './components/proveedor/crear-proveedor/crear-proveedor.component';
import { ListarProveedorComponent } from './components/proveedor/listar-proveedor/listar-proveedor.component';
import { CrearEmpleadoComponent } from './components/empleado/crear-empleado/crear-empleado.component';
import { ListarEmpleadoComponent } from './components/empleado/listar-empleado/listar-empleado.component';
import { NominaPagosComponent } from './components/pagos/nomina-pagos/nomina-pagos.component';
import { RolIndividualComponent } from './components/pagos/rol-individual/rol-individual.component';
import { CrearSalarioComponent } from './components/pagos/salario/crear-salario/crear-salario.component';
import { ListarSalarioComponent } from './components/pagos/salario/listar-salario/listar-salario.component';
import { CrearAnticipoComponent } from './components/pagos/anticipo/crear-anticipo/crear-anticipo.component';

import { ListarAnticipoComponent } from './components/pagos/anticipo/listar-anticipo/listar-anticipo.component';
import { CrearHoraExtraComponent } from './components/pagos/hora-extra/crear-hora-extra/crear-hora-extra.component';
import { ListarHoraExtraComponent } from './components/pagos/hora-extra/listar-hora-extra/listar-hora-extra.component';
import { CrearPorcentajesComponent} from './components/pagos/porcentajes/crear-porcentajes/crear-porcentajes.component';
import { ListarPorcentajesComponent } from './components/pagos/porcentajes/listar-porcentajes/listar-porcentajes.component';




const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent},
  { path: 'register-user', component: SignUpComponent},
  { path: 'main', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'user-gmail', component: UserGmailComponent },
  { path: 'nuevo-proveedor', component: CrearProveedorComponent, canActivate: [AuthGuard] },
  { path: 'editar-proveedor/:id', component: CrearProveedorComponent, canActivate: [AuthGuard] },
  { path: 'empleados', component: ListarEmpleadoComponent, canActivate: [AuthGuard] },
  { path: 'nuevo-empleado', component: CrearEmpleadoComponent, canActivate: [AuthGuard] },
  { path: 'editar-empleado/:id', component: CrearEmpleadoComponent, canActivate: [AuthGuard] },
  { path: 'proveedores', component: ListarProveedorComponent, canActivate: [AuthGuard] },
  { path: 'nomina-pagos', component: NominaPagosComponent, canActivate: [AuthGuard] },
  { path: 'rol-individual/:anho/:mes/:id', component: RolIndividualComponent, canActivate: [AuthGuard]},
  { path: 'salarios', component: ListarSalarioComponent, canActivate: [AuthGuard] },
  { path: 'nuevo-salario', component: CrearSalarioComponent, canActivate: [AuthGuard] },
  { path: 'editar-salario/:id', component: CrearSalarioComponent, canActivate: [AuthGuard] },
  { path: 'anticipos', component: ListarAnticipoComponent, canActivate: [AuthGuard] },
  { path: 'nuevo-anticipo', component: CrearAnticipoComponent, canActivate: [AuthGuard] },
  { path: 'editar-anticipo/:anho/:mes/:id', component: CrearAnticipoComponent, canActivate: [AuthGuard] },
  { path: 'horas-extra', component: ListarHoraExtraComponent, canActivate: [AuthGuard] },
  { path: 'nueva-hora-extra', component: CrearHoraExtraComponent, canActivate: [AuthGuard] },
  { path: 'editar-horaExtra/:anho/:mes/:id', component: CrearHoraExtraComponent, canActivate: [AuthGuard] },
  { path: 'porcentajes', component: ListarPorcentajesComponent, canActivate: [AuthGuard] },
  { path: 'nuevo-porcentaje/:anho/:mes', component: CrearPorcentajesComponent, canActivate: [AuthGuard] },
  { path: 'editar-porcentaje/:anho/:mes/:id', component: CrearPorcentajesComponent, canActivate: [AuthGuard] }, 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
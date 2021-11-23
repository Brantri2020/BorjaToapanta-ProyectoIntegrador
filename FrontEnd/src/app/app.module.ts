import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/usuarios/dashboard/dashboard.component';
import { SignInComponent } from './components/usuarios/sign-in/sign-in.component';
import { SignUpComponent } from './components/usuarios/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/usuarios/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/usuarios/verify-email/verify-email.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

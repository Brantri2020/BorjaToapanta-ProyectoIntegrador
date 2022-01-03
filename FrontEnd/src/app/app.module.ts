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
import { UserGmailComponent } from './components/usuarios/user-gmail/user-gmail.component';


// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    UserGmailComponent
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
    ToastrModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

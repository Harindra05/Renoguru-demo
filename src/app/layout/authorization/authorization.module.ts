import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationComponent } from './authorization.component';
import {  ForgetpasswordComponent, LoginComponent,  OtpComponent,  SignupComponent } from 'src/app/components/authorization/authorization';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorizationRoutingModule } from './authorization-routing.module';



@NgModule({
  declarations: [
    AuthorizationComponent,
    LoginComponent,
    SignupComponent,
    OtpComponent,
    ForgetpasswordComponent
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthorizationModule { }

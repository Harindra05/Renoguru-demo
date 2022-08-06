import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetpasswordComponent, LoginComponent, OtpComponent, SignupComponent } from 'src/app/components/authorization/authorization';
import { AuthorizationComponent } from './authorization.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizationComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'sign-up',
        component: SignupComponent
      },
        {
        path: 'otp',
        component: OtpComponent
      },
      {
        path: 'forget-password',
        component: ForgetpasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from './full-layout.component';

const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('../authorization/authorization.module').then(m => m.AuthorizationModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullLayoutRoutingModule { }

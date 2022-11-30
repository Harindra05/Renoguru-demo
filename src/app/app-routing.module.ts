import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ApiService } from './services/api.service';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () => import('./layout/simple-layout/simple-layout.module').then(m => m.SimpleLayoutModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./layout/full-layout/full-layout.module').then(m => m.FullLayoutModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy', useHash: true }),
    SharedModule

  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/components/pages/home/home.component';
import { AboutUsComponent, AgentsComponent, BlogsComponent, ContactComponent, PropertiesComponent } from 'src/app/components/pages/pages';
import { SimpleLayoutComponent } from './simple-layout.component';

const routes: Routes = [
  {
    path:'',
    component:SimpleLayoutComponent,
    children:[
      {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
      },
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'about-us',
        component:AboutUsComponent
      },
      {
        path:'agents',
        component:AgentsComponent
      },
      {
        path:'blogs',
        component:BlogsComponent
      },
      {
        path:'properties',
        component:PropertiesComponent
      },
      {
        path:'contact',
        component:ContactComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimpleLayoutRoutingModule { }

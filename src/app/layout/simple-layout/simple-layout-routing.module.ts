import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailsComponent } from 'src/app/components/pages/blogs/blog-details/blog-details.component';
import { EnquiryComponent } from 'src/app/components/pages/enquiry/enquiry.component';
import { HomeComponent } from 'src/app/components/pages/home/home.component';
import { InspirationDetailsComponent } from 'src/app/components/pages/inspirations/inspiration-details/inspiration-details.component';
import { AboutUsComponent, AgentsComponent, BlogsComponent, ContactComponent, InspirationsComponent, ProfileComponent, PropertiesComponent, TrendingComponent,  } from 'src/app/components/pages/pages';
import { DetailsComponent } from 'src/app/components/pages/trending/details/details.component';
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
        path:'blogs-details/:id',
        component:BlogDetailsComponent
      },
      {
        path:'designs',
        component:PropertiesComponent
      },
      {
        path:'contact',
        component:ContactComponent
      },
      {
        path:'enquiry',
        component:EnquiryComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'trending',
        component:TrendingComponent
      },
      {
        path:'trending/:id',
        component:DetailsComponent
      },
      {
        path:'inspirations',
        component:InspirationsComponent
      },
      {
        path:'inspirations/:data',
        component:InspirationDetailsComponent
      },
      {
        path:'inspirations/:data/:id',
        component:InspirationDetailsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimpleLayoutRoutingModule { }

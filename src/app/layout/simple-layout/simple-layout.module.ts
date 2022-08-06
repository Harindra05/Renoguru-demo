import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleLayoutRoutingModule } from './simple-layout-routing.module';
import { SimpleLayoutComponent } from './simple-layout.component';
import { HomeComponent } from 'src/app/components/pages/home/home.component';
import { PropertiesComponent, AboutUsComponent, AgentsComponent, BlogsComponent, ContactComponent } from 'src/app/components/pages/pages';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SimpleLayoutComponent,
    HomeComponent,
    PropertiesComponent,
    AboutUsComponent,
    AgentsComponent,
    BlogsComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    SharedModule,
    SimpleLayoutRoutingModule
  ]
})
export class SimpleLayoutModule { }

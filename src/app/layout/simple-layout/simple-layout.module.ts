import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleLayoutRoutingModule } from './simple-layout-routing.module';
import { SimpleLayoutComponent } from './simple-layout.component';
import { HomeComponent } from 'src/app/components/pages/home/home.component';
import { PropertiesComponent, AboutUsComponent, AgentsComponent, BlogsComponent, ContactComponent, ProfileComponent, InspirationsComponent, TrendingComponent, DesignsViewComponent, AddReviewComponent, DesignerViewComponent,  } from 'src/app/components/pages/pages';
import { SharedModule } from 'src/app/shared/shared.module';
import { EnquiryComponent } from 'src/app/components/pages/enquiry/enquiry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogDetailsComponent } from 'src/app/components/pages/blogs/blog-details/blog-details.component';
import { ModalModule } from 'ngb-modal';
import { DetailsComponent } from 'src/app/components/pages/trending/details/details.component';
import { InspirationDetailsComponent } from 'src/app/components/pages/inspirations/inspiration-details/inspiration-details.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { BarRatingModule } from "ngx-bar-rating";
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    SimpleLayoutComponent,
    HomeComponent,
    PropertiesComponent,
    AboutUsComponent,
    AgentsComponent,
    BlogsComponent,
    BlogDetailsComponent,
    ContactComponent,
    EnquiryComponent,
    ProfileComponent,
    TrendingComponent,
    InspirationsComponent,
    DetailsComponent,
    InspirationDetailsComponent,
    DesignsViewComponent,
    AddReviewComponent,
    DesignerViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ModalModule,
    BarRatingModule,
    SimpleLayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,  
    NgSelectModule,
    NgxDropzoneModule,NgxSliderModule
  ]
})
export class SimpleLayoutModule { }

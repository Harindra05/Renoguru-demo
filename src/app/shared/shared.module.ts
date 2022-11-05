import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CustomPaginationService } from "../services/pagination-service";
import { HeaderComponent } from "./header/header.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from "../components/pages/home/home.component";
import { GalleryComponent } from './gallery/gallery.component';
import { CarouselModule } from "ngx-owl-carousel-o";
import { AdvertisementComponent } from "../directives/advertisement/advertisement.component";
import { AddReviewComponent, HomeBlogsComponent, HomeDesignersComponent, HomeDesignsComponent } from "../components/pages/pages";
import { BarRatingModule } from "ngx-bar-rating";
import { LoginModalComponent } from "../components/modal/login-modal/login-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";



@NgModule({
    declarations: [
        HeaderComponent,
        SideBarComponent,
        FooterComponent,
        GalleryComponent,
        AdvertisementComponent,
        HomeDesignersComponent,
        HomeDesignsComponent,
        HomeBlogsComponent,
        LoginModalComponent
    ],

    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CarouselModule,
        BarRatingModule
    ],
    exports: [
        CommonModule,
        CarouselModule,
        HeaderComponent,
        RouterModule,
        SideBarComponent,
        FooterComponent,
        GalleryComponent,
        AdvertisementComponent,
        HomeDesignersComponent,
        HomeDesignsComponent,
        HomeBlogsComponent,
        LoginModalComponent
    ],
    providers: [
        CustomPaginationService
    ],
    entryComponents: [],
})
export class SharedModule { }

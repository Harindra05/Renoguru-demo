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
import { AddReviewComponent } from "../components/pages/pages";



@NgModule({
    declarations: [
        HeaderComponent,
        SideBarComponent,
        FooterComponent,
        GalleryComponent,
        AdvertisementComponent,

    ],

    imports: [
        CommonModule,
        RouterModule,
        CarouselModule,

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

    ],
    providers: [
        CustomPaginationService
    ],
    entryComponents: [],
})
export class SharedModule { }

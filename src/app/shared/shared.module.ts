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



@NgModule({
    declarations: [
        HeaderComponent,
        SideBarComponent,
        FooterComponent,
        GalleryComponent

    ],

    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [
        CommonModule,
        HeaderComponent,
        RouterModule,
        SideBarComponent,
        FooterComponent,
        GalleryComponent

    ],
    providers: [
        CustomPaginationService
    ],
    entryComponents: [],
})
export class SharedModule { }

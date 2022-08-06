import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationRoutingModule } from './layout/authorization/authorization-routing.module';
import { FullLayoutModule } from './layout/full-layout/full-layout.module';
import { ApiService } from './services/api.service';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule
} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { SimpleLayoutModule } from './layout/simple-layout/simple-layout.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    SharedModule,
    SimpleLayoutModule,
    FullLayoutModule,
    AuthorizationRoutingModule,
    ToastrModule.forRoot(),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

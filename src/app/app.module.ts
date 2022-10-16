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
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BarRatingModule } from 'ngx-bar-rating';
import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';


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
    NgxDropzoneModule,
    BarRatingModule,
    SocialLoginModule
  ],
  providers: [ApiService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '328184449528-cn5e5pofhbstue6gclsts7rjg0mjsq86.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '2022228064834010'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

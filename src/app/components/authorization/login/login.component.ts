import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from "angularx-social-login";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/services/api.service";
import { Md5 } from 'ts-md5';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  user!: SocialUser;
  isSignedin!: boolean; 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api:ApiService,
    private cookie:CookieService,
    private toastr:ToastrService,
    private socialAuthService: SocialAuthService
  ) {
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.isSignedin = (user != null);
      console.log(this.user);
      this.socialLogin(this.user)
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  submitted = false;
  async loginMethod() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return
    }
    try {
      const md5 = Md5.hashStr(this.loginForm.value.password)
      this.loginForm.value.password = md5
      let data = await this.api.post('auth/signin',this.loginForm.value)
      if(data.success){
        this.toastr.success(data.message);
        this.cookie.set('renoWeb',JSON.stringify(data.data));
        this.router.navigate(['/']);
      }
    } catch (error:any) {
      this.toastr.error(error.message);
      console.log(error);
    }
  }
  googleSignin(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  facebookSignin(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  async socialLogin(user:any){
    let req={
      "socialId": user.id,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "email": user.email,
      "userImage":user.photoUrl
    }
    try {
      let data = await this.api.post('auth/social-signup',req)
      if(data.success){
        this.cookie.set('renoWeb',JSON.stringify(data.data));
      }
    } catch (error) { 
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/services/api.service";
import { Md5 } from "ts-md5";
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from "angularx-social-login";


@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;
  user!: SocialUser;
  isSignedin!: boolean;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: Router,
    private cookie:CookieService,
    private toastr:ToastrService,
    private socialAuthService: SocialAuthService

  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        firstName: [
          "",
          [Validators.required, Validators.pattern("[a-zA-Z ]*")],
        ],
        lastName: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
        email: ["", [Validators.required, Validators.email]],
        "phone": ['',Validators.required],
        "gender": [''],
        password: ["", Validators.required],
        confirm_password: ["", Validators.required],
      },
      {
        validators: this.MustMatch("password", "confirm_password"),
      }
    );
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.isSignedin = (user != null);
      console.log(this.user);
      this.socialLogin(this.user)
    });
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors?.["mustMatch"]) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get f() {
    return this.signupForm.controls;
  }
  submitted = false;
  async signupMethod() {
    this.submitted = true;
    console.log(this.f);
    if (this.signupForm.invalid) {
      return;
    }
    try {
      const md5 = Md5.hashStr(this.signupForm.value.password)
      this.signupForm.value.password = md5;
      delete this.signupForm.value.confirm_password
      let data = await this.api.post('auth/signup-with-email',this.signupForm.value)
      if(data.success){
        this.toastr.success(data.message);
        this.cookie.set('renoWeb',JSON.stringify(data.data));
        this.route.navigate(['/otp']);
      }

    } catch (error) {
      console.error(error);
    }
  }
  async googleSignin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  async facebookSignin() {
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

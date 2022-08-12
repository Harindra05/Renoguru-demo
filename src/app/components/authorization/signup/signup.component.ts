import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/services/api.service";
import { Md5 } from "ts-md5";


@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: Router,
    private cookie:CookieService,
    private toastr:ToastrService
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
        // "country": [''],
        // "about":[''],
        // "hoursTypeIds": [],
        // "favouriteStyleTypeIds": [],
        // "userImage": [''],
        password: ["", Validators.required],
        confirm_password: ["", Validators.required],
      },
      {
        validators: this.MustMatch("password", "confirm_password"),
      }
    );

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
        this.route.navigate(['/otp']);
      }

    } catch (error) {
      console.error(error);
    }
  }
}

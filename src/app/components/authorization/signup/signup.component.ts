import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,

    private route: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        firstName: [
          "",
          [Validators.required, Validators.pattern("[a-zA-Z ]*")],
        ],
        lastName: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
        emailId: ["", [Validators.required, Validators.email]],
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
  
    } catch (error) {
      console.error(error);
    }
  }
}

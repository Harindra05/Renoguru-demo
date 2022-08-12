import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
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
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api:ApiService,
    private cookie:CookieService,
    private toastr:ToastrService
  ) {
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
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
}

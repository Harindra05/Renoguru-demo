import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  public receviedotpForm!: FormGroup;
  public phoneNumber: any;

  constructor(
    private fb: FormBuilder,
    private api:ApiService,
    private cookie:CookieService,
    private toastr:ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
   
    this.receviedotpForm = this.fb.group({
      otp: ["", Validators.required],
    });
  }

  get f() {
    return this.receviedotpForm.controls;
  }
  submitted = false;
  async otpverifiyMethod() {
    try {
      console.log(this.receviedotpForm.value);
      
      let data = await this.api.post('auth/verify-otp',this.receviedotpForm.value)
      if(data.success){
        this.toastr.success(data.message);
        this.cookie.set('renoWeb',JSON.stringify(data.data));
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.error(error);
    }
  }

}

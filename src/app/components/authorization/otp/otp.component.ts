import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
   

    private route: Router
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
    this.submitted = true;
    
    try {
 
    } catch (error) {
      console.error(error);
    }
  }

}

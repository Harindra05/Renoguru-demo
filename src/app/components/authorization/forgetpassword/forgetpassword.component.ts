import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-forgetpassword",
  templateUrl: "./forgetpassword.component.html",
  styleUrls: ["./forgetpassword.component.scss"],
})
export class ForgetpasswordComponent implements OnInit {
  public forgetForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      emailOrPhoneNo: ["", [Validators.required, Validators.email]],
    });
  }
  get f() {
    return this.forgetForm.controls;
  }
  submitted = false;
  async forgetMethod() {
    this.submitted = true;
    let data = this.forgetForm.value;
    if (this.forgetForm.invalid) {
      return;
    }
    localStorage.setItem("forget", data.emailOrPhoneNo);
    try {
      this.forgetForm.invalid;
    
    } catch (error) {
      console.error(error);
    }
  }
}

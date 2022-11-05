import { Component, DoCheck, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialAuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { LoginModalComponent } from 'src/app/components/modal/login-modal/login-modal.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,DoCheck {
  userData:boolean=false;
  inspirationTypes:Array<any>=[]
  constructor(private cookie:CookieService, private modalService: NgbModal,private router:Router,private socialAuthService: SocialAuthService,private api:ApiService) { }

 async ngOnInit(){
    await this.getInspirationType();
  }
  async getInspirationType() {
    try {
      let data = await this.api.post("house-types",{
        "limit": 10000,
        "offset": 0
    });
    if(data.success){
      this.inspirationTypes=data.data.rows;
    }
    } catch (error) {
    }
  }
  ngDoCheck(): void {
    if (this.cookie.check('renoWeb')) {
      if (this.cookie.get("renoWeb")) {
          this.userData=true;
      }
  }
  else{
    this.userData=false
  }
  }
  logout(){
    this.cookie.delete('renoWeb')
    this.router.navigate(['/home'])
    this.socialAuthService.signOut();
  }
  navigate(){
    console.log('navigate');
  }
  modalRef:any;
  openModal(){
    if(!this.userData){
        this.modalRef = this.modalService.open(LoginModalComponent);
    }
    else{
      this.router.navigateByUrl('/enquiry')
    }
}
}

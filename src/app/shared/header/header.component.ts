import { Component, DoCheck, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,DoCheck {
  userData:boolean=false;
  constructor(private cookie:CookieService,private router:Router,private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {

  }
  ngDoCheck(): void {
    if (this.cookie.check('renoWeb')) {
      if (this.cookie.get("renoWeb")) {
          // let a  = JSON.parse(this.cookie.get("renoWeb")); 
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
    // window.location.reload()
  }
  navigate(){
    console.log('navigate');
    
  }
}

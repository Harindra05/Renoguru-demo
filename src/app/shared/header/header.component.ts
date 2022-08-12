import { Component, DoCheck, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,DoCheck {
  userData:boolean=false;
  constructor(private cookie:CookieService,private router:Router) { }

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
    // window.location.reload()
  }
}

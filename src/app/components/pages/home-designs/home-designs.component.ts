import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { LoginModalComponent } from '../../modal/login-modal/login-modal.component';


@Component({
  selector: 'app-home-designs',
  templateUrl: './home-designs.component.html',
  styleUrls: ['./home-designs.component.scss']
})
export class HomeDesignsComponent implements OnInit {
  featuredDesign: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }


  Object = {
    limit: 10,
    offset :0
  }
  designList :any;
  
  constructor(public api :ApiService,
    private modalService:NgbModal,private cookie:CookieService,) { }

  ngOnInit(): void {
    this.getDesignList()
  }
  async getDesignList(){
    try{
      let data = await this.api.post('designs/get-designs',{limit:this.Object.limit,offset:this.Object.offset})
      if(data.success){
        this.designList =data.data.rows
        console.log(this.designList,'get-design');
      }
    }
    catch(error){
      console.error(error);
      
    }
  }
  modalRef:any
  async likeUnlike(id:any){
    if(!this.cookie.check('renoWeb')){
      this.modalRef = this.modalService.open(LoginModalComponent);
  }
  else{
    try{
      let data = this.api.post('designs/like-unlike-design',{designId:id})
  console.log(data);
  

    }catch(error){
      console.error()
    }

  }
  }
}

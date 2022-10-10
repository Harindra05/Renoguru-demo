import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home-designers',
  templateUrl: './home-designers.component.html',
  styleUrls: ['./home-designers.component.scss']
})
export class HomeDesignersComponent implements OnInit {
  featuredDesigner: OwlOptions = {
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

  desinerList :any
  Object = {
    limit: 10,
    offset: 0
}
  constructor( public api :ApiService) {
  
   }

  ngOnInit(): void {

    this.designList()
  }
 async designList(){
    try{
       let data =  await this.api.post('designs/get-designers',this.Object)
       if(data.success){
         console.log(data);
         this.desinerList=data.data.rows
       }

    }catch(error){
      console.error()

    }
  }

}

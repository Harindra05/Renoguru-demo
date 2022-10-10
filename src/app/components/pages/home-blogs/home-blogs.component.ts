import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home-blogs',
  templateUrl: './home-blogs.component.html',
  styleUrls: ['./home-blogs.component.scss']
})
export class HomeBlogsComponent implements OnInit {
  featuredBlog: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:false,
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


  listDetails :any
  Object = {
    limit: 10,
    offset: 0
}
  constructor( public api :ApiService) {
  
   }

  ngOnInit(): void {

    this.blogList()
  }
 async blogList(){
    try{
       let data =  await this.api.post('blogs',this.Object)
       if(data.success){
         console.log(data);
         this.listDetails=data.data.rows
       }

    }catch(error){
      console.error()

    }
  }

}

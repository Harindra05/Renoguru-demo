import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {
  addSectionHide :boolean =false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  constructor(private api:ApiService) { }
  @Input() add:any
  listDetails: Array<any>=[];
  listFilter :Array<any>=[];
  ngOnInit(): void {
    this.getAdvertisement()
  }
  async getAdvertisement() {
      try {
      let data = await this.api.post("advertisements",{
        "limit": 10000,
        "offset": 0
    });
    if(data.success){
      this.listDetails=data.data.rows;
      this.listFilter= this.listDetails.filter((e:any)=>{
        return e.section_type==this.add
      })
      console.log(this.listFilter);
      
    }
    } catch (error) {
    }
}
addHide(){
  this.addSectionHide=true
}
}

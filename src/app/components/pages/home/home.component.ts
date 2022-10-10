import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  videoData :any
  section_type=1;
  customOptions: OwlOptions = {
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
  @ViewChild("videoPlayer", 
  { static: false }) videoplayer !: ElementRef;
  constructor(private api :ApiService) { }
  isPlay: boolean = false;
  trendingData:any;

  ngOnInit(): void {
    this.getVideo();
    this.getTrendingTypes()
  }


  toggleVideo() {
    this.videoplayer.nativeElement.play();
  }
  async getVideo(){
    try{
      let res = await this.api.post('videos/',{limit: 10, offset: 0})
      console.log(res.data.rows);
      this.videoData =res.data.rows
    }catch(error){

    }
  }

  async getTrendingTypes(){
    try {
      let data = await this.api.post("trending-types",{
        "limit": 10000,
        "offset": 0
    });
    if(data.success){
      this.trendingData=data.data.rows;
    }
    } catch (error) {
    }
  }

}

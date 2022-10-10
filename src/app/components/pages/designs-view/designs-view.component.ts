import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-designs-view',
  templateUrl: './designs-view.component.html',
  styleUrls: ['./designs-view.component.scss']
})
export class DesignsViewComponent implements OnInit {
  designer_id :any
  designerDetails :any
  reviewDetails:any
  designList :any

  obj = {
    limit :100,
    offset :0
  }

  design: any;
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
  Object = {
    limit: 10,
    offset :0
  }
  packageIncludes :any
  constructor( private api :ApiService ,public param :ActivatedRoute ,private toster :ToastrService) { }

  ngOnInit(): void {
    this.designer_id  = this.param.snapshot.params.id;
    this.design = JSON.parse(localStorage.getItem('detailItem') || '{}');
    console.log(this.design);
    
    this.packageIncludes = this.design.packageIncludes.split(',')
    this.getDesignList()
    
  }
  async getDesignList(){
    try{
      let data = await this.api.post('designs/get-designs',{limit:this.Object.limit,offset:this.Object.offset})
      if(data.success){
        this.designList =data.data.rows
      }
    }
    catch(error){
      console.error(error);
    }
  }
  async likeUnlike(id:any){
    console.log(id);
    
    try{
      let data = await this.api.post('designs/like-unlike-design',{designId:id})
      if(data.success){
        this.toster.success(data.message)
        this.getDesignList()
      }
    }catch(error){
      console.error()
    }
  }






}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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

  constructor( private api :ApiService ,public param :ActivatedRoute ,private toster :ToastrService) { }

  ngOnInit(): void {

    this.designer_id  = this.param.snapshot.params.id;
    this.getDesiner()
    this.designerReviews()
    this.getDesignDetails()
    
  }

  async getDesiner(){
    try{
      let data = await this.api.post("designs/get-designer",{designerId:this.designer_id})
      if(data){
       this.designerDetails =data.data.data
       console.log(this.designerDetails);
       
      }

    }catch(error){

    }
  }

  async getDesignDetails(){
    
    try{
      let data = await this.api.post('designs/get-designs',{designerId:this.designer_id,limit:this.obj.limit,offset:this.obj.offset})
      if(data.success){
        this.designList=data.data.rows
        console.log(this.designList,'design view list');
        

      }

    }catch(error){

    }
  }

 async likeUnlike(id:any){
  let body ={
    designId: id
  }
  try{
    let data = await this.api.post("designs/like-unlike-design",body)
    if(data.success){
      this.toster.success(data.message)
      this.getDesignDetails()
      console.log(data);
    }

  }catch(error){

  }
 }
 async designerReviews(){
  try{
    let data = await this.api.post("designs/designer-reviews",{designerId:this.designer_id,limit:this.obj.limit,offset:this.obj.offset})
    if(data.success){
      this.reviewDetails =data.data.rows
    }

  }catch(error){
    console.error()
  }

 }

}

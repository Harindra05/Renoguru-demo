import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { LoginModalComponent } from '../../modal/login-modal/login-modal.component';


@Component({
  selector: 'app-designer-view',
  templateUrl: './designer-view.component.html',
  styleUrls: ['./designer-view.component.scss']
})
export class DesignerViewComponent implements OnInit {
  designer_id :any
  designerDetails :any
  reviewDetails:any
  designList :any

  obj = {
    limit :100,
    offset :0
  }

  constructor( private api :ApiService ,
    private modalService:NgbModal,private cookie:CookieService,public param :ActivatedRoute ,private toster :ToastrService) { }

  ngOnInit(): void {

    this.designer_id  = this.param.snapshot.params.id;
    this.getDesiner()
    this.designerReviews()
    this.getDesignList()
    
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

  async getDesignList(){
    
    try{
      let data = await this.api.post('designs/get-designs',{designerId:this.designer_id,limit:this.obj.limit,offset:this.obj.offset})
      if(data.success){
        this.designList=data.data.rows
        

      }

    }catch(error){

    }
  }

  modalRef:any
  async likeUnlike(id:any){
    if(!this.cookie.check('renoWeb')){
      this.modalRef = this.modalService.open(LoginModalComponent);
  }
  else{
  let body ={
    designId: id
  }
  try{
    let data = await this.api.post("designs/like-unlike-design",body)
    if(data.success){
      this.toster.success(data.message)
      this.getDesignList()
      console.log(data);
    }

  }catch(error){

  }
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

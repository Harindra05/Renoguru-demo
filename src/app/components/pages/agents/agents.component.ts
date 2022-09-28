import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {
  Object = {
    limit: 10,
    offset :0
  }
  designList :any;
  constructor(public api :ApiService, private router: Router) { }

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
  async likeUnlike(id:any){
    try{
      let data = await this.api.post('designs/like-unlike-design',{designId:id})
      if(data.success){
        this.getDesignList()
      }
    }catch(error){
      console.error()
    }
  }

  openDetail(data: any){
    localStorage.setItem('detailItem', JSON.stringify(data));
    this.router.navigate(['design/design-view',data.id]);
  }

}

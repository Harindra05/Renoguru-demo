import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit,OnDestroy {
  Object:any = {
    limit: 10000,
    offset :0,
  }
  designList :any;
  constructor(public api :ApiService, private router: Router) { }

 async ngOnInit() {
    if(localStorage.getItem('advanceSearch')){
      let items:any = localStorage.getItem('advanceSearch');
      let b=JSON.parse(items);
      this.Object.budget=b.budget
      this.Object.areaRange=b.areaRange
      this.Object.imageInspirationType=b.imageInspirationType
      this.Object.trendingTypes=b.trendingTypes
    }
    await this.getDesignList();

  }
  async getDesignList(){
    try{
      let data = await this.api.post('designs/get-designs',this.Object)
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
ngOnDestroy(): void {
  localStorage.removeItem('advanceSearch');
}
}

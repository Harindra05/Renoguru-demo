import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  searchForm ! :FormGroup;
  trendingData :any;
  constructor(public api :ApiService, private router: Router,private fb:FormBuilder) { }

 async ngOnInit() {
    if(localStorage.getItem('advanceSearch')){
      let items:any = localStorage.getItem('advanceSearch');
      let b=JSON.parse(items);
      this.Object.budget=b.budget
      this.Object.areaRange=b.areaRange
      this.Object.imageInspirationType=b.imageInspirationType
      this.Object.trendingTypes=b.trendingTypes
    }
    this.searchForm = this.fb.group({
      trendingTypes :'',
      imageInspirationType:'',
      areaRange:'',
      budget:'',
    })
    await this.getDesignList();
    this.getTrendingTypes()


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
  async searchSubmit(){
    let data = this.searchForm.value;
    this.Object.budget=data.budget
    this.Object.areaRange=data.areaRange
    this.Object.imageInspirationType=data.imageInspirationType
    this.Object.trendingTypes=data.trendingTypes
    await this.getDesignList()
    console.log(data);
  }

  openDetail(data: any){
    localStorage.setItem('detailItem', JSON.stringify(data));
    this.router.navigate(['design/design-view',data.id]);
  }
ngOnDestroy(): void {
  localStorage.removeItem('advanceSearch');
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

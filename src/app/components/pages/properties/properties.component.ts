import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  desinerList :any;
  trendingData:any;
  section_type =4;
  searchForm!:FormGroup
  Object:any = {
    limit: 1000,
    offset: 0
}
  constructor( public api :ApiService, private fb :FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      trendingTypes :'',
      imageInspirationType:'',
      areaRange:'',
      budget:'',
    })
    this.designList()
    this.getTrendingTypes()
  }
 async designList(){
    try{
       let data =  await this.api.post('designs/get-designers',this.Object)
       if(data.success){
         this.desinerList=data.data.rows
         console.log(this.desinerList);
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
    await this.designList()
    console.log(data);
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

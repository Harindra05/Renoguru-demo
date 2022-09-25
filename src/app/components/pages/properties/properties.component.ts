import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  desinerList :any
  Object = {
    limit: 10,
    offset: 0
}
  constructor( public api :ApiService) {
  
   }

  ngOnInit(): void {

    this.designList()
  }
 async designList(){
  
    try{
       let data =  await this.api.post('designs/get-designers',this.Object)
       
       if(data.success){
         console.log(data);
         this.desinerList=data.data.rows
         console.log(this.desinerList);
        
       }

    }catch(error){
      console.error()

    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {

  listDetails: Array<any>=[];
  img='assets/images/image_1.jpg'
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.getBlogList();
  }
  async getBlogList() {
    try {
      let data = await this.api.post("trendings",{
        "limit": 10000,
        "offset": 0
    });
    if(data.success){
      this.listDetails=data.data.rows
    }
      // console.log(this.listDetails);
    } catch (error) {
      
    }
  }


}

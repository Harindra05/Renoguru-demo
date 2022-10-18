import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-inspirations',
  templateUrl: './inspirations.component.html',
  styleUrls: ['./inspirations.component.scss']
})
export class InspirationsComponent implements OnInit {

  listDetails: Array<any>=[];
  img='assets/images/image_1.jpg';
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.getInspirationList();
  }
  async getInspirationList() {
    try {
      let data = await this.api.post("inspirations",{
        "limit": 10000,
        "offset": 0
    });
    if(data.success){
      this.listDetails=data.data.rows
    }
    } catch (error) {
      
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  listDetails: Array<any>=[];
  img='assets/images/image_1.jpg'
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.getBlogList();
    window.scrollTo({
      top:0
    })
  }
  async getBlogList() {
    try {
      let data = await this.api.post("blogs",{
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

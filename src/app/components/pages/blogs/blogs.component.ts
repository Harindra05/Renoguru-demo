import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  listDetails: Array<any>=[];

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.getBlogList();
  }
  async getBlogList() {
    try {
      let data = await this.api.post("blogs",{
        "limit": 10,
        "offset": 0
    });
    this.listDetails=data.data.rows
      console.log(this.listDetails);
    } catch (error) {
      
    }
  }

}

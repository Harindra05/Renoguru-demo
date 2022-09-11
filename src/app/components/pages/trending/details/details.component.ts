import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  img='assets/images/image_1.jpg';
  blog_id:any;
  blogDetails:any;
  constructor(private route:ActivatedRoute,private api:ApiService) { 
  }

  async ngOnInit(){
    this.blog_id = this.route.snapshot.paramMap.get('id');
    await this.getTrendingDetails()
    window.scrollTo({
      top:0
    })
  }
    async getTrendingDetails(){
      try {
        let data = await this.api.get('trendings/'+this.blog_id)
        this.blogDetails=data.data
      } catch (error) {
        
      }
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  img='assets/images/image_1.jpg';
  blog_id:any;
  blogDetails:any;
  constructor(private route:ActivatedRoute,private api:ApiService) { 
  }

  async ngOnInit(){
    this.blog_id = this.route.snapshot.paramMap.get('id');
    await this.getBlogDetails()
    window.scrollTo({
      top:0
    })
  }
    async getBlogDetails(){
      try {
        let data = await this.api.get('blogs/'+this.blog_id)
        this.blogDetails=data.data
      } catch (error) {
        
      }
    }
}

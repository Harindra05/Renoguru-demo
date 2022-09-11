import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-inspiration-details',
  templateUrl: './inspiration-details.component.html',
  styleUrls: ['./inspiration-details.component.scss']
})
export class InspirationDetailsComponent implements OnInit {
  img='assets/images/image_1.jpg';
  blog_id:any;
  blogDetails:any;
  type:any;
  listDetails:Array<any>=[];
  typeIdToString:any;
  currentRoute: any;
  constructor(private route:ActivatedRoute,private api:ApiService,private router: Router) { 
    this.router.events.subscribe(async(event: any) => {
      if (event instanceof NavigationStart) {
          console.log('Route change detected');
      }

      if (event instanceof NavigationEnd) {
         await this.ngOnInit()
      }
    });
  }

  async ngOnInit(){
    this.type = this.route.snapshot.paramMap.get('data');    
    this.blog_id = this.route.snapshot.paramMap.get('id');
    if(this.type){
      this.typeIdToString=this.type=='living' ? 2 : this.type=='dining' ? 3 : this.type=='bedroom' ? 4 : 5
    }
    if(this.blog_id){
      await this.getInspirations()
    }
    else{
      await this.getInspirationList()
    }
    window.scrollTo({
      top:0
    })
  }
    async getInspirations(){
      this.blogDetails=[]
      try {
        let data = await this.api.get('inspirations/'+this.blog_id)
        this.blogDetails=data.data
      } catch (error) {
        
      }
    }
    async getInspirationList() {
      try {
        let data = await this.api.post("inspirations",{
          "limit": 10000,
          "offset": 0
      });
      if(data.success){
        this.listDetails=[]
        let a=[]
         a =data.data.rows
        a.map((e:any)=>{
          if(this.typeIdToString==e.type)
            this.listDetails.push(e)
        })
      }
      } catch (error) {
        
      }
    }
}

import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { LoginModalComponent } from 'src/app/components/modal/login-modal/login-modal.component';


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
  Object:any = {
    limit: 10000,
    offset :0,
    imageInspirationType:null
  }
  designList :Array<any>=[];
  constructor(private route:ActivatedRoute,private api:ApiService,private router: Router, private modalService:NgbModal,private cookie:CookieService) { 
    this.router.events.subscribe(async(event: any) => {
      if (event instanceof NavigationStart) {
          console.log('Route change detected');
      }
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
         this.ngOnInit()
        }, 500);
      }
    });
  }

  async ngOnInit(){
    this.type = this.route.snapshot.paramMap.get('data'); 
    // this.blog_id = this.route.snapshot.paramMap.get('id');
    if(this.type){
      this.typeIdToString=this.type
    }
    // if(this.blog_id){
    //   await this.getInspirations()
    // }
    // else{
      await this.getInspirationList()
      await this.getDesignList();
    // }
    window.scrollTo({
      top:0
    })

  }
    // async getInspirations(){
    //   this.blogDetails=[]
    //   try {
    //     let data = await this.api.get('inspirations/'+this.blog_id)
    //     this.blogDetails=data.data
    //   } catch (error) {
        
    //   }
    // }
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
          if(this.typeIdToString==e.master_insipiration.title){
          this.listDetails.push(e)
          }
        })   
        this.Object.imageInspirationType=this.listDetails[0].type         
      }
      } catch (error) {
        
      }
    }
    async getDesignList(){
      this.designList=[];
      try{
        let data = await this.api.post('designs/get-designs',this.Object)
        if(data.success){
          const abc:any =data.data.rows;
          abc.map(async(e:any)=>{            
            e.design_images.map(async(f:any)=>{
               this.designList.push(e)
            })  
          })  
        }
        this.designList=[...new Set(this.designList)];
      }
      catch(error){
        console.error(error);
      }
    }
    modalRef:any
    async likeUnlike(id:any){
      if(!this.cookie.check('renoWeb')){
        this.modalRef = this.modalService.open(LoginModalComponent);
    }
    else{
      try{
        let data = await this.api.post('designs/like-unlike-design',{designId:id})
        if(data.success){
          this.getDesignList()
        }
      }catch(error){
        console.error()
      }
    }
    }
  
    openDetail(data: any){
      localStorage.setItem('detailItem', JSON.stringify(data));
      this.router.navigate(['design/design-view',data.id]);
    }
  }

import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UploadS3Service } from 'src/app/services/s3.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {
  reviewForm ! :FormGroup
  files: File[] = [];
  images:Array<any>=[]
  value: number = 0;
  value1: number = 0;
  value2: number = 0;
  value3: number = 0;
  options: Options = {
    floor: 0,
    ceil: 10
  };
  options1: Options = {
    floor: 0,
    ceil: 10
  };
  options2: Options = {
    floor: 0,
    ceil: 10
  };
  options3: Options = {
    floor: 0,
    ceil: 10
  };
  designerId:any;
  constructor(private api :ApiService,private fb :FormBuilder,private s3:UploadS3Service,public param :ActivatedRoute,private router:Router){ }

  ngOnInit(): void {
    this.reviewForm= this.fb.group({
      renovationCost:'',
      renovationDuration:'',
      serviceRendered:'',
      renovationDurationType:'',
      designConcept:'',
      qualityOfRenovation:'',
      houseTypeId:'',
      valueForMoney:'',
      review:'',
      fullName: '',
      email: '',
      phoneNumber: '',
      imageUrl :''
    })
    this.designerId  = this.param.snapshot.params.id;
  
  }

async addReviewSubmit(){
  let concatatedvalue = this.reviewForm.value.renovationDuration+" "+this.reviewForm.value.renovationDurationType;
  console.log(this.reviewForm.value);
  
  let body:any = {
      designerId : this.designerId,
      houseTypeId: +this.reviewForm.value.houseTypeId,
      renovationCost:+this.reviewForm.value.renovationCost,
      renovationDuration:   concatatedvalue,
      serviceRendered: this.reviewForm.value.serviceRendered,
      designConcept: this.reviewForm.value.designConcept,
      qualityOfRenovation: this.reviewForm.value.qualityOfRenovation,
      valueForMoney: this.reviewForm.value.valueForMoney,
      fullName: this.reviewForm.value.fullName,
      email: this.reviewForm.value.email,
      phoneNumber: ''+this.reviewForm.value.phoneNumber,
      review:this.reviewForm.value.review
  }

  try{
    if(this.files.length>0){
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        try {
          let response = await this.s3.uploadFile(file,'reviews/'+file?.lastModified+file.name)
            const url = await(response as any).Location;
            this.images.push({imageUrl:url,type:i});     
        } catch (error) {
          console.error(error);
        }
      }
    }
    body.images=this.images;
    console.log(body.renovationDuration);
    let data = await this.api.post('designs/create-designer-review',body)
    console.log(data);
    if(data.success){
      this.router.navigate(['/designer/designer-view',this.designerId]);
    }
  }catch(error){
    console.error()
  }
}
onSelect(event:any) {
  this.files.push(...event.addedFiles);
}
onRemove(event:any) {
  this.files.splice(this.files.indexOf(event), 1);
}
}
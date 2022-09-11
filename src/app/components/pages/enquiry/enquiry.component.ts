import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit {
  enquiryForm !:FormGroup
  submitted :boolean = false;
  selectedAreas:Array<any>=[]
  options : Array<any>= [
    {name:'Living Room', id:'1' ,isPushed:false},
    {name:'Dining Room', id:'2',isPushed:false},
    {name:'Kitchen', id:'3',isPushed:false},
    {name:'Bedroom', id:'4',isPushed:false},
    {name:'Bathroom', id:'5',isPushed:false},
    {name:'Others', id:'6',isPushed:false}
  ]
  constructor( private fb:FormBuilder, private toastr :ToastrService ,private api :ApiService
    ) {
      this.enquiryForm = this.fb.group({
        propertyTypeId:[''],
        designerNeed: [''],
        noOfBedrooms: [''],
        areasNeedToRenovate:[''],
        propertyStatus: [''],
        propertyAddress: [],
        budget: [''],
        keyCollectionPeriod: [''],
        renovationLoan: [''],  
        priority: [],
        userEnquiryType: ['1'],
        fullName: [],
        email: [],
        phone: [],
        otherInformation: []
      })
     }

 
  get f(){
    return this.enquiryForm.controls
  }

  ngOnInit(): void {
  }

  updateCheckedOptions(i:any){
    let value=this.options[i];
    if(value.isPushed==false){
      this.options[i].isPushed=true;
      this.selectedAreas.push(this.options[i]);
    }
    else{
      this.options[i].isPushed=false;
      this.selectedAreas.splice(this.options[i],1)
    }
  }

  async enquiryFormSubmited(){
    this.submitted = true;
    let a =this.selectedAreas.map((e)=>{
      return e.id
    })
    this.enquiryForm.value.priority=this.enquiryForm.value.priority==true ? '0':'1';
    this.enquiryForm.value.areasNeedToRenovate=a.toString()
    try{
      let res = await this.api.post('enquiry/create', this.enquiryForm.value)
      if(res.success){
        this.toastr.success(res.message);
        this.enquiryForm.reset()
    }
    }catch(error:any){
      this.toastr.error(error.message);
    }
  }

}

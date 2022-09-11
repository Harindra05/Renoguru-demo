import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ModalManager } from "ngb-modal";
import { CookieService } from "ngx-cookie-service";
import { ApiService } from "src/app/services/api.service";
declare var $: any;

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  user_id: any;
  profileForm!: FormGroup;
  editprofile ! :FormGroup
  profileDetails:any;
  @ViewChild('myModal') myModal:any;
  private modalRef:any;
  constructor(
    public api: ApiService,
    public cookie: CookieService,
    public fb: FormBuilder,
    private modalService: ModalManager,
  ) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstName: [""],
      lastName: [""],
      country: [""],
      about: [""],
      phone: [""],
      gender: [""],
      // isEmailVerified: true
      // singUpType: 1
      userImage: [""],
    });
    this.editprofile = this.fb.group({
      firstName: [""],
      lastName: [""],
      country: [""],
      about: [""],
      phone: [""],
      gender: [""],
      // isEmailVerified: true
      // singUpType: 1
      userImage: [""],
    });

    let data = JSON.parse(this.cookie.get("renoWeb"));
    this.user_id = data.id;
    console.log(this.user_id);
    this.setProfileForm();
  }
  // async addServicePopup(){
  //   this.modal.open(AddServiceComponent,{size :'sm',centered:true})
  // }
  // async addHeaderServicePopup(){
  //   this.modal.open(AddServiceHeaderComponent,{size :'sm',centered:true})


  // }


  async setProfileForm() {
    try {
      let data = await this.api.get("auth/my-profile");
      if (data.success) {
        this.profileDetails=data.data
        console.log(data);
        this.profileForm.patchValue({
          firstName: this.profileDetails.firstName,
          lastName: this.profileDetails.lastName,
          country: this.profileDetails.country,
          gender: this.profileDetails.gender,
          phone: this.profileDetails.phone,
        });
      }
    } catch (error) {
      console.error();
    }
  }
  openModal(item:any){
    this.modalRef = this.modalService.open(this.myModal, {
      size: "lg",
      modalClass: 'mymodal',
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop"
  })
  }
}
//  editProfileForm(){

//   try{

//   }catch(error){
//     console.error()
//   }

// }



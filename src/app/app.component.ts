import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
} from "angularx-social-login";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { Md5 } from "ts-md5";
import { ApiService } from "./services/api.service";
declare var $: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private socialAuthService: SocialAuthService,public fb :FormBuilder,
    public api :ApiService,public toster :ToastrService,
    public cookie:CookieService
    ) {};
  MessageForm! :FormGroup;
  messageEnquiryFrom!:FormGroup;
  loginBtn : boolean =false
  ngOnInit(): void {
    this.MessageForm =this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    })

    this.messageEnquiryFrom =this.fb.group({
      property_type:[''],
      area_renovate:[''],
      budget:[''],

    })
    var element = $(".floating-chat");
    var myStorage = localStorage;

    if (!myStorage.getItem("chatID")) {
      myStorage.setItem("chatID", createUUID());
    }

    setTimeout(function () {
      element.addClass("enter");
    }, 1000);

    element.click(openElement);

    function openElement() {
      var messages = element.find(".messages");
      var textInput = element.find(".text-box");
      element.find(">i").hide();
      element.addClass("expand");
      element.find(".chat").addClass("enter");
      var strLength = textInput.val().length * 2;
      textInput.keydown(onMetaAndEnter).prop("disabled", false).focus();
      element.off("click", openElement);
      element.find(".header button").click(closeElement);
      element.find("#sendMessage").click(sendNewMessage);
      messages.scrollTop(messages.prop("scrollHeight"));
    }

    function closeElement() {
      element.find(".chat").removeClass("enter").hide();
      element.find(">i").show();
      element.removeClass("expand");
      element.find(".header button").off("click", closeElement);
      element.find("#sendMessage").off("click", sendNewMessage);
      element
        .find(".text-box")
        .off("keydown", onMetaAndEnter)
        .prop("disabled", true)
        .blur();
      setTimeout(function () {
        element.find(".chat").removeClass("enter").show();
        element.click(openElement);
      }, 500);
    }

    function createUUID() {
      // http://www.ietf.org/rfc/rfc4122.txt
      var s: any = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      return uuid;
    }

    function sendNewMessage() {
      var userInput = $(".text-box");
      var newMessage = userInput
        .html()
        .replace(/\<div\>|\<br.*?\>/gi, "\n")
        .replace(/\<\/div\>/g, "")
        .trim()
        .replace(/\n/g, "<br>");

      if (!newMessage) return;

      var messagesContainer = $(".messages");

      messagesContainer.append(
        ['<li class="self">', newMessage, "</li>"].join("")
      );

      // clean out old message
      userInput.html("");
      // focus on input
      userInput.focus();

      messagesContainer.finish().animate(
        {
          scrollTop: messagesContainer.prop("scrollHeight"),
        },
        250
      );
    }

    function onMetaAndEnter(event: any) {
      if ((event.metaKey || event.ctrlKey) && event.keyCode == 13) {
        sendNewMessage();
      }
    }
  }

  async loginSubmit(){
    let req = {
      email :this.MessageForm.value.email,
      password :this.MessageForm.value.password,
    }
    try{
      const md5 = Md5.hashStr(req.password)
      req.password=md5
      let res = await this.api.post('auth/signin',req);
      if(res.success){ 
        this.toster.success(res.message)
        this.loginBtn =true;
        this.MessageForm.reset();
        this.cookie.set('renoWeb',JSON.stringify(res.data));
      }else{
        this.toster.error(res['message']);
        this.MessageForm.reset();  
      }

    }catch(error: any){
      this.toster.error(error['message']);
      this.MessageForm.reset();

    }
  }
  async submitEnquiryForm(){
    let req = {
      email :this.MessageForm.value.email,
      password :this.MessageForm.value.password,
    }
    try{
      let res = await this.api.post('auth/signin',req)
      if(res.success){
        
        this.toster.success(res.message)
        this.loginBtn =true;

      }else{
        this.toster.error(res['message']);

        
      }

    }catch(error:any){
      this.toster.error(error['message']);

      

    }

  }
  googleSignin(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  facebookSignin(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}

import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(window).scrollTop(0);
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}

import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-design-card',
  templateUrl: './design-card.component.html',
  styleUrls: ['./design-card.component.scss']
})
export class DesignCardComponent implements OnInit {

  @Output('liked') like!: EventEmitter;
  @Input('design') design!: any;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openDetail(data: any) {
    localStorage.setItem('detailItem', JSON.stringify(data));
    this.router.navigate(['design/design-view', data.id]);
  }

  likeUnlike(id: any) {
    this.like.emit(id);
  }
}

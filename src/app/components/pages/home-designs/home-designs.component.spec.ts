import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDesignsComponent } from './home-designs.component';

describe('HomeDesignsComponent', () => {
  let component: HomeDesignsComponent;
  let fixture: ComponentFixture<HomeDesignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDesignsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDesignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

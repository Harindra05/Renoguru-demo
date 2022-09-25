import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignsViewComponent } from './designs-view.component';

describe('DesignsViewComponent', () => {
  let component: DesignsViewComponent;
  let fixture: ComponentFixture<DesignsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

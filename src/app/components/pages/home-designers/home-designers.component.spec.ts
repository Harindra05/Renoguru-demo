import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDesignersComponent } from './home-designers.component';

describe('HomeDesignersComponent', () => {
  let component: HomeDesignersComponent;
  let fixture: ComponentFixture<HomeDesignersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDesignersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDesignersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

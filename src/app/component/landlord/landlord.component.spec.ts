import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordComponent } from './landlord.component';

describe('LandlordComponent', () => {
  let component: LandlordComponent;
  let fixture: ComponentFixture<LandlordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandlordComponent]
    });
    fixture = TestBed.createComponent(LandlordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

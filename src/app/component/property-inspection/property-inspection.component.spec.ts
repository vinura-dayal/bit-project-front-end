import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyInspectionComponent } from './property-inspection.component';

describe('PropertyInspectionComponent', () => {
  let component: PropertyInspectionComponent;
  let fixture: ComponentFixture<PropertyInspectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyInspectionComponent]
    });
    fixture = TestBed.createComponent(PropertyInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PropertyInspectionService } from './property-inspection.service';

describe('PropertyInspectionService', () => {
  let service: PropertyInspectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyInspectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

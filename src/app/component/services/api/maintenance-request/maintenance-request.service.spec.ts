import { TestBed } from '@angular/core/testing';

import { ManitenanceRequestService } from './maintenance-request.service';

describe('ManitenanceRequestService', () => {
  let service: ManitenanceRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManitenanceRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

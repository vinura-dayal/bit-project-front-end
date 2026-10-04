import { TestBed } from '@angular/core/testing';

import { UtilityBillService } from './utility-bill.service';

describe('UtilityBillService', () => {
  let service: UtilityBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilityBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

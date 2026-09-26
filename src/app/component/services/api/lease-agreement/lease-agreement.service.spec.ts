import { TestBed } from '@angular/core/testing';

import { LeaseAgreementService } from './lease-agreement.service';

describe('LeaseAgreementService', () => {
  let service: LeaseAgreementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaseAgreementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

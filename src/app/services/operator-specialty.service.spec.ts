import { TestBed } from '@angular/core/testing';

import { OperatorSpecialtyService } from './operator-specialty.service';

describe('OperatorSpecialtyService', () => {
  let service: OperatorSpecialtyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperatorSpecialtyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SpareProcedureService } from './spare-procedure.service';

describe('SpareProcedureService', () => {
  let service: SpareProcedureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpareProcedureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

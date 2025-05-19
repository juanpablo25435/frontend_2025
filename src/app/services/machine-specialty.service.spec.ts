import { TestBed } from '@angular/core/testing';

import { MachineSpecialtyService } from './machine-specialty.service';

describe('MachineSpecialtyService', () => {
  let service: MachineSpecialtyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachineSpecialtyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

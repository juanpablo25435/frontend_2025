import { TestBed } from '@angular/core/testing';

import { ComboMachineService } from './combo-machine.service';

describe('ComboMachineService', () => {
  let service: ComboMachineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComboMachineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

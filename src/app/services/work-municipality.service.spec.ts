import { TestBed } from '@angular/core/testing';

import { WorkMunicipalityService } from './work-municipality.service';

describe('WorkMunicipalityService', () => {
  let service: WorkMunicipalityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkMunicipalityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

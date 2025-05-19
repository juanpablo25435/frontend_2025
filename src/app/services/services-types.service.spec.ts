import { TestBed } from '@angular/core/testing';

import { ServicesTypesService } from './services-types.service';

describe('ServicesTypesService', () => {
  let service: ServicesTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

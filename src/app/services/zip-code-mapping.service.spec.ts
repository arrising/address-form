import { TestBed } from '@angular/core/testing';

import { ZipCodeMappingService } from './zip-code-mapping.service';

describe('ZipCodeMappingService', () => {
  let service: ZipCodeMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZipCodeMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

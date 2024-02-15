import { TestBed } from '@angular/core/testing';

import { ZipCodeLookupService } from './zip-code-lookup.service';

describe('ZipCodeLookupService', () => {
  let service: ZipCodeLookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZipCodeLookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

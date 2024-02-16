import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ZipCodeLookupService } from './zip-code-lookup.service';

import { Address } from '../models/Address';

describe('ZipCodeLookupService', () => {
  let service: ZipCodeLookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });
    service = TestBed.inject(ZipCodeLookupService);
  });

  describe('on initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('isAddressCompleteForLookup', () => {
    const parameters = [
      {
        'description': 'empty input',
        expected: false,
        value: {} as Address
      },
      {
        'description': 'Missing Address line 1',
        expected: false,
        value: {
          addressLine2: 'Address line 2',
          city: 'A City',
          state: 'MI',
          zipCode: '11111-1111'
        } as Address
      },
      {
        'description': 'Missing Address line 2',
        expected: true,
        value: {
          addressLine1: 'Address line 1',
          city: 'A City',
          state: 'MI',
          zipCode: '11111-1111'
        } as Address
      },
      {
        'description': 'Missing City',
        expected: false,
        value: {
          addressLine1: 'Address line 1',
          addressLine2: 'Address line 2',
          state: 'MI',
          zipCode: '11111-1111'
        } as Address
      },
      {
        'description': 'Missing State',
        expected: false,
        value: {
          addressLine1: 'Address line 1',
          addressLine2: 'Address line 2',
          city: 'A City',
          zipCode: '11111-1111'
        } as Address
      },
      {
        'description': 'Missing ZipCode',
        expected: true,
        value: {
          addressLine1: 'Address line 1',
          addressLine2: 'Address line 2',
          city: 'A City',
          state: 'MI',
        } as Address
      },
      {
        'description': 'Has All Values',
        expected: true,
        value: {
          addressLine1: 'Address line 1',
          addressLine2: 'Address line 2',
          city: 'A City',
          state: 'MI',
          zipCode: '11111-1111'
        } as Address
      }
    ];

    parameters.forEach(parameter => {
      it(`${parameter.description} should return ${parameter.expected}`, () => {
        expect(service.isAddressCompleteForLookup(parameter.value)).toBe(parameter.expected);
      });
    })
  });

});

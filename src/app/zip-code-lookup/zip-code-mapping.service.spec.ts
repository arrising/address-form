import { TestBed } from '@angular/core/testing';

import { ZipCodeMappingService } from './zip-code-mapping.service';
import { Address } from '../models/Address';

describe('ZipCodeMappingService', () => {
  let service: ZipCodeMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZipCodeMappingService);
  });

  describe('on initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('mapAddressToRequestXml', () => {
    it('address should map to xml', () => {
      const value = {
        addressLine1: 'Line 1',
        addressLine2: 'Line 2',
        city: 'City',
        state: 'State',
        zipCode: '11111-1111'
      } as Address;
      const expected = '<ZipCodeLookupRequest USERID="431MICHI2638"><Address ID="0"><Address1>Line 1</Address1>' +
        '<Address2>Line 2</Address2><City>City</City><State>State</State></Address></ZipCodeLookupRequest>';
      expect(service.mapAddressToRequestXml(value)).toBe(expected)
    });
  });

  describe('mapApiResponseToAddress', () => {
    it('address should map to xml', () => {

      const value = '<?xml version="1.0" encoding="UTF-8"?><ZipCodeLookupResponse><Address ID="0">'
        + '<Address2>Line 1</Address2><City>City</City><State>State</State>'
        + '<Zip5>11111</Zip5><Zip4>1111</Zip4></Address></ZipCodeLookupResponse>';

      const expected = {
        addressLine1: 'Line 1',
        city: 'City',
        state: 'State',
        zipCode: '11111-1111'
      } as Address;

      expect(service.mapApiResponseToAddress(value)).toEqual(expected)
    });
  });
});

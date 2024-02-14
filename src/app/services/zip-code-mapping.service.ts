import { Injectable } from '@angular/core';
import { Address } from '../models/Address';
import { ZipCodeLookupRequest } from '../models/ZipCodeLookupRequest';
import { environment } from 'src/environments/environment.development';
import { ZipCodeLookupResponse } from '../models/ZipCodeLookupResponse';
import * as xmlUtilities from '../Utilities/JsonToXml';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeMappingService {

  constructor() { }

  mapAddressToRequestXml(source: Address): string {
    const request = this.toZipCodeLookupRequest(source);
    const requestXml = xmlUtilities.convertXML('ZipCodeLookupRequest', request);
    return requestXml;
  }

  mapApiResponseToAddress(source: string): Address {
    var apiResponse = this.toZipCodeLookupResponse(source);
    var result = this.zipCodeLookupResponsetoAddress(apiResponse);
    return result;
  }

  private toZipCodeLookupRequest(source: Address): ZipCodeLookupRequest {
    const result = {
      '@': {
        USERID: environment.zipCodeServiceUserId
      },
      Address: {
        '@': { ID: '0' },
        Address1: source.addressLine1,
        Address2: source.addressLine2,
        City: source.city,
        State: source.state,
      }
    } as ZipCodeLookupRequest;
    return result;
  }

  private toZipCodeLookupResponse(source: string): ZipCodeLookupResponse {
    const json = xmlUtilities.convertStringToJson(source);
    const result = json?.ZipCodeLookupResponse as ZipCodeLookupResponse;
    return result;
  }

  private zipCodeLookupResponsetoAddress(source: ZipCodeLookupResponse): Address {
    var address = source.Address[0];
    const result = {
      addressLine1: address.Address2[0],
      city: address.City[0],
      state: address.State[0],
      zipCode: `${address.Zip5[0]}-${address.Zip4[0]}`
    } as Address;
    return result;
  }
}

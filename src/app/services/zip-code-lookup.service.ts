import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Address } from '../models/Address';
import { ZipCodeLookupRequest } from '../models/ZipCodeLookupRequest';
import { environment } from 'src/environments/environment.development';
import * as xmlUtilities from '../Utilities/JsonToXml';
import { ZipCodeLookupResponse } from '../models/ZipCodeLookupResponse';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeLookupService {
  constructor(private _http: HttpClient) { }

  getAddressZipCode(address: Address): Observable<any> {
    const request = this.toZipCodeLookupRequest(address);
    const requestXml = xmlUtilities.convertXML('ZipCodeLookupRequest', request);
    const url = `${environment.zipCodeServiceBaseUrl}/shippingapi.dll?API=ZipCodeLookup&XML=${requestXml}`;

    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/xml'
        }),
        responseType: "text",
      }).pipe(
        map(x => this.toZipCodeLookupResponse(x)),
        map(x => this.toAddress(x)),
        tap(response => {
          return response;
        }),
        catchError(this.handleError<string>(`getAddressZipCode`))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
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

  private toAddress(source: ZipCodeLookupResponse): Address {

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

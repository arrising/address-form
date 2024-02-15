import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Address } from '../models/Address';
import { environment } from 'src/environments/environment.development';
import * as xmlUtilities from '../Utilities/JsonToXml';
import { ZipCodeMappingService } from './zip-code-mapping.service';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeLookupService {
  constructor(private _http: HttpClient, private _mapper: ZipCodeMappingService) { }

  getAddressZipCode(address: Address): Observable<any> {
    const requestXml = this._mapper.mapAddressToRequestXml(address);
    const url = `${environment.zipCodeServiceBaseUrl}/shippingapi.dll?API=ZipCodeLookup&XML=${requestXml}`;

    return this._http.get(url,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/xml'
        }),
        responseType: "text",
      }).pipe(
        map(x => this._mapper.mapApiResponseToAddress(x)),
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
}

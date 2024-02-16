import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { Address } from '../models/Address';
import { environment } from 'src/environments/environment.development';
import { ZipCodeMappingService } from './zip-code-mapping.service';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeLookupService {
  constructor(private _http: HttpClient, private _mapper: ZipCodeMappingService) { }

  isAddressCompleteForLookup(address: Address): boolean {
    return !!address
      //TODO:  Need better validaiton, for now, checking minimun length
      && this.hasMinimunLength(address.addressLine1, 4)
      && this.hasMinimunLength(address.city, 3)
      && this.hasMinimunLength(address.state, 2);
  }

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
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  private hasMinimunLength(value: string, minLength: number): boolean {
    return !!value && value !== '' && value.length >= minLength;
  }
}

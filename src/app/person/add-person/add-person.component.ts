import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/Address';
import { ZipCodeLookupService } from 'src/app/services/zip-code-lookup.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent {
  result$: Observable<Address>;

  public address: Address = {
    addressLine1: '911 Military St',
    city: 'Port Huron',
    state: 'Michigan'
  }

  constructor(private _zipCodeService: ZipCodeLookupService) {
    this.result$ = this._zipCodeService.getAddressZipCode(this.address);
  }
}

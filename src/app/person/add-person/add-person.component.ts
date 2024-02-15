import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/Address';
import { ZipCodeLookupService } from 'src/app/services/zip-code-lookup.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent {
  result$: Observable<Address>;
  allowDiagnostics = environment.allowDiagnostics;
  personForm = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    address: this._formBuilder.group({
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    }),
  });

  public address: Address = {
    addressLine1: '911 Military St',
    city: 'Port Huron',
    state: 'Michigan'
  }

  constructor(private _formBuilder: FormBuilder, private _zipCodeService: ZipCodeLookupService) {
    this.result$ = this._zipCodeService.getAddressZipCode(this.address);
  }

  onSubmit() {
    alert('CLicked Submit!');
  }
}

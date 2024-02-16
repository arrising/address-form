import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, take, tap } from 'rxjs';
import { Address } from 'src/app/models/Address';
import { ZipCodeLookupService } from 'src/app/zip-code-lookup/zip-code-lookup.service';
import { environment } from 'src/environments/environment';
import { PersonDialogComponent } from '../person-dialog/person-dialog.component';
import { Person } from 'src/app/models/Person';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnDestroy {
  private _formWatch: Subscription;
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
      zipCode: ['', Validators.required],
    }),
  });

  constructor(private _formBuilder: FormBuilder, private _zipCodeService: ZipCodeLookupService,
    private _dialog: MatDialog) {
    this._formWatch = this.personForm.valueChanges.subscribe((value) => this.onFormChange(value));
  }

  ngOnDestroy(): void {
    if (this._formWatch?.unsubscribe) {
      this._formWatch.unsubscribe();
    }
  }

  onFormChange($event: any): void {
    const address = this.personForm.value.address as Address;

    if (address && this._zipCodeService.isAddressCompleteForLookup(address)) {
      this._zipCodeService.getAddressZipCode(address).pipe(
        take(1),
        tap(response => {
          const value = { address: response };
          const options = { emitEvent: false };
          this.personForm.patchValue(value, options);
        })
      ).subscribe();
    }
  }

  onSubmit() {
    this._dialog.open(PersonDialogComponent, {
      data: this.personForm.value as Person
    })
  }
}

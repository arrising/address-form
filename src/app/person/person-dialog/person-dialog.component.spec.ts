import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDialogComponent } from './person-dialog.component';
import { MockModule } from 'ng-mocks';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { Person } from 'src/app/models/Person';

describe('PersonDialogComponent', () => {
  let component: PersonDialogComponent;
  let fixture: ComponentFixture<PersonDialogComponent>;
  let person: Person;

  beforeEach(() => {
    person = {
      firstName: 'First',
      lastName: 'Last',
      phoneNumber: '5555555555',
      address: {
        addressLine1: 'Line 1',
        addressLine2: 'Line 2',
        city: 'City',
        state: 'State',
        zipCode: 'ZipCode'
      }
    } as Person;
    TestBed.configureTestingModule({
      declarations: [PersonDialogComponent],
      imports: [
        MockModule(AngularMaterialModule),
        MockModule(AppPipesModule)
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: person },
      ]
    });
    fixture = TestBed.createComponent(PersonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('on initialization', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });
  });
});

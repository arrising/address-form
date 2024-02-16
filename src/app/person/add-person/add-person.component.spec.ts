import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonComponent } from './add-person.component';
import { MockModule, MockService } from 'ng-mocks';
import { ZipCodeLookupService } from 'src/app/zip-code-lookup/zip-code-lookup.service';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { AppControlsModule } from 'src/app/app-controls/app-controls.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddPersonComponent', () => {
  let component: AddPersonComponent;
  let fixture: ComponentFixture<AddPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPersonComponent],
      imports: [
        ReactiveFormsModule,
        MockModule(AngularMaterialModule),
        MockModule(AppControlsModule)
      ],
      providers: [
        { provide: ZipCodeLookupService, useValue:MockService(ZipCodeLookupService) },
      ]
    });
    fixture = TestBed.createComponent(AddPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

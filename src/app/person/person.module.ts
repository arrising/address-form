import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPersonComponent } from './add-person/add-person.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AppControlsModule } from '../app-controls/app-controls.module';
import { NgxMatInputTelComponent } from 'ngx-mat-input-tel';

@NgModule({
  declarations: [
    AddPersonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AppControlsModule,
    NgxMatInputTelComponent
  ]
})
export class PersonModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { NgxMatInputTelComponent } from 'ngx-mat-input-tel';
import { ZipCodeDirective } from './zip-code.directive';

@NgModule({
  declarations: [
    ZipCodeDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    NgxMatInputTelComponent
  ],
  exports: [
    NgxMatInputTelComponent,
    ZipCodeDirective
  ]
})
export class AppControlsModule { }

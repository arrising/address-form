import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneNumberPipe } from './phone-number.pipe';

@NgModule({
  declarations: [
    PhoneNumberPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PhoneNumberPipe
  ]
})
export class AppPipesModule { }

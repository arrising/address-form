import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPersonComponent } from './add-person/add-person.component';

@NgModule({
  declarations: [
    AddPersonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class PersonModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AppControlsModule } from '../app-controls/app-controls.module';
import { AppPipesModule } from '../app-pipes/app-pipes.module';
import { AddPersonComponent } from './add-person/add-person.component';
import { PersonDialogComponent } from './person-dialog/person-dialog.component';

@NgModule({
  declarations: [
    AddPersonComponent,
    PersonDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AppControlsModule,
    AppPipesModule
  ]
})
export class PersonModule { }

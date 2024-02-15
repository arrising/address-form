import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTableModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTableModule
  ]
})
export class AngularMaterialModule { }

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from 'src/app/models/Person';

@Component({
  selector: 'app-person-dialog',
  templateUrl: './person-dialog.component.html',
  styleUrls: ['./person-dialog.component.scss']
})
export class PersonDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public person: Person) { }
}

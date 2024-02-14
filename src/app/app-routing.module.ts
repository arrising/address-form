import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPersonComponent } from './person/add-person/add-person.component';

const routes: Routes = [
  { path: '',   redirectTo: '/addPerson', pathMatch: 'full' },
  { path: 'addPerson', component: AddPersonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

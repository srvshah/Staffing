import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentComponent } from './assignment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';


const routes: Routes = [
  {
    path: '',
    component: AssignmentComponent
  }
];

@NgModule({
  declarations: [AssignmentFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class AssignmentModule { }

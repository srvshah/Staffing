import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JobComponent } from './job.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { JobFormComponent } from './job-form/job-form.component';


const routes: Routes = [
  {
    path: '',
    component: JobComponent
  }
];

@NgModule({
  declarations: [JobFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class JobModule { }

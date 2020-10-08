import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail.component';
import { MaterialModule } from '../shared/material.module';

const routes: Routes = [
  {
    path: ':id',
    component: UserDetailComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class UserDetailModule { }

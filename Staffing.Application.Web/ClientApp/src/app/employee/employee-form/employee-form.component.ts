import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MvEmployee } from '../employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  empForm: FormGroup;
  action: string;
  employee: MvEmployee = {} as MvEmployee;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeFormComponent>
  ) {
    this.action = data.action;
    this.employee = data.data || {};
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.empForm = this.fb.group({
      firstName: [this.employee.firstName, Validators.required],
      lastName: [this.employee.lastName, Validators.required],
      middleName: [this.employee.middleName],
      username: [this.employee.username],
      password: [this.employee.password],
      mobile: [this.employee.mobile, Validators.required],
      address: [this.employee.address, Validators.required],
      phone: [this.employee.phone]

    });
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    this.dialogRef.close(this.employee);
  }

}

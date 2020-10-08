import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/customer/customer.service';
import { EmployeeService } from 'src/app/employee/employee.service';
import { JobService } from 'src/app/job/job.service';
import { MvAssignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.scss']
})
export class AssignmentFormComponent implements OnInit {

  assignmentForm: FormGroup;
  action: string;
  employees: any = [];
  jobs: any = [];
  statuses = [{
    value: true, viewValue: 'complete'
  }, {
    value: false, viewValue: 'assigned'
  }];
  assignment: MvAssignment = {} as MvAssignment;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private es: EmployeeService,
    private js: JobService,
    public dialogRef: MatDialogRef<AssignmentFormComponent>
  ) {
    this.action = data.action;
    this.assignment = data.data || {};
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.assignmentForm = this.fb.group({
      jobId: [this.assignment.jobId, Validators.required],
      employeeId: [this.assignment.employeeId, Validators.required],
      status: [this.assignment.status],
      hoursWorked: [this.assignment.hoursWorked]
    });
    this.fetchEmployees();
    this.fetchJobs();
  }

  fetchEmployees(): void{
    this.es.getEmployees().subscribe(res => {
      if (res && res.data){
        res.data.forEach(item => {
          if (item.employeeId){
            this.employees.push({
              value: item.employeeId,
              viewValue: `${item.firstName} ${item.middleName || ''} ${item.lastName}`
            });
          }
        });
      }
    }, err => console.log(err));
  }

  fetchJobs(): void{
    this.js.getJobs().subscribe(res => {
      if (res && res.data){
        res.data.forEach(item => {
          if (item.jobId){
            this.jobs.push({
              value: item.jobId,
              viewValue: item.title
            });
          }
        });
      }
    }, err => console.log(err));
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    this.assignment.employeeId = this.assignmentForm.get('employeeId').value;
    this.assignment.jobId = this.assignmentForm.get('jobId').value;
    this.assignment.status = this.assignmentForm.get('status').value;
    this.dialogRef.close(this.assignment);
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/customer/customer.service';
import { MvJob } from '../job.model';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {

  jobForm: FormGroup;
  action: string;
  customers = [];
  job: MvJob = {} as MvJob;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private cs: CustomerService,
    public dialogRef: MatDialogRef<JobFormComponent>
  ) {
    this.action = data.action;
    this.job = data.data || {};
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      title: [this.job.title, Validators.required],
      detail: [this.job.detail, Validators.required],
      rate: [this.job.rate, Validators.required],
      customerId: [this.job.customerId, Validators.required],
    });
    this.fetchCustomers();
  }

  fetchCustomers(): void{
    this.cs.getCustomers().subscribe(res => {
      if (res && res.data){
        res.data.forEach(item => {
          if (item.customerId){
            this.customers.push({
              value: item.customerId,
              viewValue: item.name
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
    this.job.customerId = this.jobForm.get('customerId').value;
    this.dialogRef.close(this.job);
  }

}

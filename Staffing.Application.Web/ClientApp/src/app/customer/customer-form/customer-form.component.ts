import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MvCustomer } from '../customer.model';

@Component({
  selector: 'zen-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  custForm: FormGroup;
  action: string;
  customer: MvCustomer = {} as MvCustomer;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CustomerFormComponent>
  ) {
    this.action = data.action;
    this.customer = data.data || {};
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.custForm = this.fb.group({
      name: [this.customer.name, Validators.required],
      detail: [this.customer.detail, Validators.required],
      address: [this.customer.address, Validators.required],
      mobile: [this.customer.mobile, Validators.required],
      phone: [this.customer.phone]
    });
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    this.dialogRef.close(this.customer);
  }

}

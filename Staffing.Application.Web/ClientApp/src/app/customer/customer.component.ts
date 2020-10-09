import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { MvCustomer } from './customer.model';
import { SelectionModel } from '@angular/cdk/collections';
import { UtilityService } from 'src/core/services/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from './customer-form/customer-form.component';

@Component({
  selector: 'zen-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  userMsg: string = null;
  displayedColumns: string[];
  dataSource: MvCustomer[] = [];
  selectedCustomer: MvCustomer = {} as MvCustomer;
  selection = new SelectionModel<MvCustomer>(false, []);
  constructor(
    private cs: CustomerService,
    private us: UtilityService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.displayedColumns = ['customerId', 'name', 'detail', 'address', 'phone', 'mobile'];
    this.getCustomers();
  }

  getCustomers(): void{
    this.cs.getCustomers().subscribe(res => {
      if (res && res.data){
        this.dataSource = res.data;
        this.userMsg = null;
      } else {
        this.dataSource = [];
        this.userMsg = 'No data';
      }
    }, err => console.log(err));
  }

  addCustomer(): void{
    this.clearSelection();
    this.openDialog('Add');
  }

  clearSelection(): void{
    this.selection.clear();
    this.selectedCustomer = {} as MvCustomer;
  }

  editCustomer(): void{
    this.openDialog('Edit');
  }

  openDialog(action: string): void{
    if (action === 'Edit' && !this.selection.hasValue()){
      this.us.openSnackBar('Select a customer before editing', 'warning');
      return;
    }
    const dialogRef = this.dialog.open(CustomerFormComponent, {
     data: {
       action,
       data: this.selectedCustomer
     }

    });

    dialogRef.afterClosed().subscribe(customer => {
      if (customer){
        if (action === 'Edit'){
          this.cs.updateCustomer(customer).subscribe(res => {
            this.getCustomers();
            this.us.openSnackBar('Customer Updated', 'success');
          });
        }
        else {
          this.cs.addCustomer(customer).subscribe(res => {
            this.getCustomers();
            this.us.openSnackBar('Customer Added', 'success');
          }, err => console.log(err));
        }
      }
      this.clearSelection();
    });
  }

  onRowClicked(row: any): void{
    this.selectedCustomer = { ...row };
    this.selection.toggle(row);
  }

}

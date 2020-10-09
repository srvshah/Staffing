import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';
import { MvTransaction } from './transaction.model';
import { SelectionModel } from '@angular/cdk/collections';
import { UtilityService } from 'src/core/services/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceService } from '../invoice/invoice.service';

@Component({
  selector: 'zen-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  userMsg: string = null;
  displayedColumns: string[];
  dataSource: MvTransaction[] = [];
  selectedTransaction: MvTransaction = {} as MvTransaction;
  selection = new SelectionModel<MvTransaction>(false, []);
  selectionCheckBox = new SelectionModel<MvTransaction>(true, []);
  constructor(
    private ts: TransactionService,
    private us: UtilityService,
    private dialog: MatDialog,
    private is: InvoiceService
    ) { }

  ngOnInit(): void {
    this.displayedColumns = ['select', 'transactionId', 'assignmentId', 'employeeName', 'hoursWorked', 'customerName', 'rate', 'amount'];
    this.getTransactions();
  }

  getTransactions(): void{
    this.ts.getTransactions().subscribe(res => {
      if (res && res.data){
        this.dataSource = res.data;
        this.userMsg = null;
      } else {
        this.dataSource = [];
        this.userMsg = 'No data';
      }
    }, err => console.log(err));
  }

  generateInvoice(): void{
    if (!this.selectionCheckBox.hasValue()){
      this.us.openSnackBar('Select transaction to generate invoice', 'warning');
    }
    else {
      if (!this.hasSameCustomer(this.selectionCheckBox.selected) && !this.hasSameEmployee(this.selectionCheckBox.selected)){
        this.us.openSnackBar('Select transactions on a common customer or employee', 'warning');
      }
      else {
        this.is.addInvoice(this.selectionCheckBox.selected).subscribe(res => {
          this.us.openSnackBar('Invoice Generated', 'success');
          this.clearSelection();
        }, err => console.log(err));
      }
    }
  }

  clearSelection(): void{
    this.selectionCheckBox.clear();
    this.selection.clear();
    this.getTransactions();
  }

  hasSameCustomer(array): boolean {
    const first = array[0];
    return array.every((element) => {
        return element.customerId === first.customerId;
    });
  }

  hasSameEmployee(array): boolean {
    const first = array[0];
    return array.every((element) => {
        return element.employeeId === first.employeeId;
    });
  }

  onRowClicked(row: any): void{
    this.selectedTransaction = { ...row };
    this.selection.toggle(row);
    this.selectionCheckBox.toggle(row);
  }

  isAllSelected(): boolean {
    const numSelected = this.selectionCheckBox.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
        this.selectionCheckBox.clear() :
        this.dataSource.forEach(row => this.selectionCheckBox.select(row));
  }

 

}

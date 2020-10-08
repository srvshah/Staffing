import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';
import { MvTransaction } from './transaction.model';
import { SelectionModel } from '@angular/cdk/collections';
import { UtilityService } from 'src/core/services/utility.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'zen-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  userMsg: string = null;
  displayedColumns: string[];
  dataSource: MvTransaction[] = [];
  selectedJob: MvTransaction = {} as MvTransaction;
  selection = new SelectionModel<MvTransaction>(false, []);
  constructor(
    private ts: TransactionService,
    private us: UtilityService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.displayedColumns = ['transactionId', 'assignmentId', 'employeeName', 'hoursWorked', 'customerName', 'rate', 'amount'];
    this.getTransactions();
  }

  getTransactions(): void{
    this.ts.getTransactions().subscribe(res => {
      if (res && res.data){
        this.dataSource = res.data;
      } else {
        this.dataSource = [];
        this.userMsg = 'No data';
      }
    }, err => console.log(err));
  }

  // addTransaction(): void{
  //   this.selection.clear();
  //   this.selectedJob = {} as MvJob;
  //   this.openDialog('Add');
  // }

  // editJob(): void{
  //   this.openDialog('Edit');
  // }

  // openDialog(action: string): void{
  //   if (action === 'Edit' && !this.selection.hasValue()){
  //     this.us.openSnackBar('Select a job before editing', 'warning');
  //     return;
  //   }
  //   const dialogRef = this.dialog.open(JobFormComponent, {
  //    data: {
  //      action,
  //      data: this.selectedJob
  //    }

  //   });

  //   dialogRef.afterClosed().subscribe(job => {
  //     if (job){
  //       if (action === 'Edit'){
  //         this.ts.updateJob(job).subscribe(res => {
  //           this.getJobs();
  //           this.us.openSnackBar('Job Updated', 'success');
  //         });
  //       }
  //       else {
  //         this.ts.addJob(job).subscribe(res => {
  //           this.getJobs();
  //           this.us.openSnackBar('Job Added', 'success');
  //         }, err => console.log(err));
  //       }
  //     }
  //   });
  // }

  // onRowClicked(row: any): void{
  //   this.selectedJob = { ...row };
  //   this.selection.toggle(row);
  // }

}

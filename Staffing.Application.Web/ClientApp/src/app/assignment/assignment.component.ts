import { Component, OnInit } from '@angular/core';
import { AssignmentService } from './assignment.service';
import { MvAssignment } from './assignment.model';
import { SelectionModel } from '@angular/cdk/collections';
import { UtilityService } from 'src/core/services/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';
import { TransactionService } from '../transaction/transaction.service';

@Component({
  selector: 'zen-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {
  userMsg: string = null;
  displayedColumns: string[];
  dataSource: MvAssignment[] = [];
  selectedAssignment: MvAssignment = {} as MvAssignment;
  selection = new SelectionModel<MvAssignment>(false, []);
  selectionCheckBox = new SelectionModel<MvAssignment>(true, []);
  constructor(
    private as: AssignmentService,
    private us: UtilityService,
    private dialog: MatDialog,
    private ts: TransactionService
    ) { }

  ngOnInit(): void {
    this.displayedColumns = ['select', 'assignmentId', 'jobTitle', 'employeeName', 'status', 'hoursWorked'];
    this.getAssignments();
  }

  getAssignments(): void{
    this.as.getAssignments().subscribe(res => {
      if (res && res.data){
        this.dataSource = res.data;
      } else {
        this.dataSource = [];
        this.userMsg = 'No data';
      }
    }, err => console.log(err));
  }

  addAssignment(): void{
    this.selection.clear();
    this.selectedAssignment = {} as MvAssignment;
    this.openDialog('Add');
  }

  editAssignment(): void{
    this.openDialog('Edit');
  }

  openDialog(action: string): void{
    if (action === 'Edit' && !this.selection.hasValue()){
      this.us.openSnackBar('Select a Assignment before editing', 'warning');
      return;
    }
    const dialogRef = this.dialog.open(AssignmentFormComponent, {
     data: {
       action,
       data: this.selectedAssignment
     }

    });

    dialogRef.afterClosed().subscribe(assignment => {
      if (assignment){
        if (action === 'Edit'){
          this.as.updateAssignment(assignment).subscribe(res => {
            this.getAssignments();
            this.us.openSnackBar('Assignment Updated', 'success');
          });
        }
        else {
          this.as.addAssignment(assignment).subscribe(res => {
            this.getAssignments();
            this.us.openSnackBar('Assignment Added', 'success');
          }, err => console.log(err));
        }
      }
      this.selectionCheckBox.clear();
      this.selection.clear();
    });
  }

  onRowClicked(row: any): void{
    this.selectedAssignment = { ...row };
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

  generateTransaction(){
    if (!this.selectionCheckBox.hasValue()){
      this.us.openSnackBar('Select assignment to generate transaction', 'warning');
    }
    else {
      if (this.isAssigned(this.selectionCheckBox.selected)){
        this.us.openSnackBar('Cannot generate transaction of assigned assignment', 'warning');
      }
      else if (this.zeroHoursWorked(this.selectionCheckBox.selected)){
        this.us.openSnackBar('Cannot create transaction for zero hours worked', 'warning');
      }
      else {
        this.ts.addTransaction(this.selectionCheckBox.selected).subscribe(res => {
          console.log(res);
          this.us.openSnackBar('Transaction Generated', 'success');
        }, err => console.log(err));
      }
    }
  }

  isAssigned(array): boolean{
    let res = false;
    array.forEach(item => {
      if (!item.status){
        res = true;
        return;
      }
    });
    return res;
  }

  zeroHoursWorked(array): boolean{
    let res = false;
    array.forEach(item => {
      if (item.hoursWorked === 0){
        res = true;
        return;
      }
    });
    return res;
  }

}

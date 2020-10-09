import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { MvEmployee } from './employee.model';
import { SelectionModel } from '@angular/cdk/collections';
import { UtilityService } from 'src/core/services/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@Component({
  selector: 'zen-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  userMsg: string = null;
  displayedColumns: string[];
  dataSource: MvEmployee[] = [];
  selectedEmployee: MvEmployee = {} as MvEmployee;
  selection = new SelectionModel<MvEmployee>(false, []);
  constructor(
    private es: EmployeeService,
    private us: UtilityService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.displayedColumns = ['employeeId', 'firstName', 'middleName', 'lastName', 'username', 'password', 'address', 'phone', 'mobile'];
    this.getEmployees();
  }

  getEmployees(): void{
    this.es.getEmployees().subscribe(res => {
      if (res && res.data){
        this.dataSource = res.data;
        this.userMsg = null;
      } else {
        this.dataSource = [];
        this.userMsg = 'No data';
      }
    }, err => console.log(err));
  }

  addEmployee(): void{
    this.clearSelection();
    this.openDialog('Add');
  }

  clearSelection(): void{
    this.selection.clear();
    this.selectedEmployee = {} as MvEmployee;
  }

  editEmployee(): void{
    this.openDialog('Edit');
  }

  openDialog(action: string): void{
    if (action === 'Edit' && !this.selection.hasValue()){
      this.us.openSnackBar('Select an employee before editing', 'warning');
      return;
    }
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
     data: {
       action,
       data: this.selectedEmployee
     }

    });

    dialogRef.afterClosed().subscribe(employee => {
      if (employee){
        if (action === 'Edit'){
          this.es.updateEmployee(employee).subscribe(res => {
            this.getEmployees();
            this.us.openSnackBar('Employee Updated', 'success');
          });
        }
        else {
          this.es.addEmployee(employee).subscribe(res => {
            this.getEmployees();
            this.us.openSnackBar('Employee Added', 'success');
          }, err => console.log(err));
        }
      }
      this.clearSelection();
    });
  }

  onRowClicked(row: any): void{
    this.selectedEmployee = { ...row };
    this.selection.toggle(row);
  }

}

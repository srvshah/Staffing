import { Component, OnInit } from '@angular/core';
import { JobService } from './job.service';
import { MvJob } from './job.model';
import { SelectionModel } from '@angular/cdk/collections';
import { UtilityService } from 'src/core/services/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { JobFormComponent } from './job-form/job-form.component';
@Component({
  selector: 'zen-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  userMsg: string = null;
  displayedColumns: string[];
  dataSource: MvJob[] = [];
  selectedJob: MvJob = {} as MvJob;
  selection = new SelectionModel<MvJob>(false, []);
  constructor(
    private js: JobService,
    private us: UtilityService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.displayedColumns = ['jobId', 'title', 'detail', 'rate', 'customerName'];
    this.getJobs();
  }

  getJobs(): void{
    this.js.getJobs().subscribe(res => {
      if (res && res.data){
        this.dataSource = res.data;
      } else {
        this.dataSource = [];
        this.userMsg = 'No data';
      }
    }, err => console.log(err));
  }

  addJob(): void{
    this.selection.clear();
    this.selectedJob = {} as MvJob;
    this.openDialog('Add');
  }

  editJob(): void{
    this.openDialog('Edit');
  }

  openDialog(action: string): void{
    if (action === 'Edit' && !this.selection.hasValue()){
      this.us.openSnackBar('Select a job before editing', 'warning');
      return;
    }
    const dialogRef = this.dialog.open(JobFormComponent, {
     data: {
       action,
       data: this.selectedJob
     }

    });

    dialogRef.afterClosed().subscribe(job => {
      if (job){
        if (action === 'Edit'){
          this.js.updateJob(job).subscribe(res => {
            this.getJobs();
            this.us.openSnackBar('Job Updated', 'success');
          });
        }
        else {
          this.js.addJob(job).subscribe(res => {
            this.getJobs();
            this.us.openSnackBar('Job Added', 'success');
          }, err => console.log(err));
        }
      }
    });
  }

  onRowClicked(row: any): void{
    this.selectedJob = { ...row };
    this.selection.toggle(row);
  }
}

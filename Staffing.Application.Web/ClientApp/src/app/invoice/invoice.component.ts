import { Component, OnInit } from '@angular/core';
import { InvoiceService } from './invoice.service';
import { MvInvoice, MvInvoiceDetail } from './invoice.model';
import { SelectionModel } from '@angular/cdk/collections';
import { UtilityService } from 'src/core/services/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

@Component({
  selector: 'zen-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  userMsg: string = null;
  displayedColumns: string[];
  dataSource: MvInvoice[] = [];
  selectedInvoice: MvInvoice = {} as MvInvoice;
  selection = new SelectionModel<MvInvoice>(false, []);
  invoiceDetail: MvInvoiceDetail[] = [];
  constructor(
    private js: InvoiceService,
    private us: UtilityService,
    private dialog: MatDialog,
    private is: InvoiceService
    ) { }

  ngOnInit(): void {
    this.displayedColumns = ['invoiceId', 'total', 'employeeName', 'customerName', 'invoiceNumber'];
    this.getInvoice();
  }

  getInvoice(): void{
    this.js.getInvoice().subscribe(res => {
      if (res && res.data){
        this.dataSource = res.data;
        this.userMsg = null;
      } else {
        this.dataSource = [];
        this.userMsg = 'No data';
      }
    }, err => console.log(err));
  }

  getInvoiceDetail(): void{
    if (!this.selection.hasValue()){
      this.us.openSnackBar('Please select an invoice to view details', 'warning');
    }
    else {
      this.is.getInvoiceDetail(this.selectedInvoice.invoiceId).subscribe(res => {
        if (res && res.data){
          this.invoiceDetail = res.data;
          const dialogRef = this.dialog.open(InvoiceDetailComponent, {
            width: '800px',
            height: '500px',
            data: {
              invoice: this.selectedInvoice,
              invoiceDetail: this.invoiceDetail
            }
          });

          dialogRef.afterClosed().subscribe(message => {
            if (message === 'print'){
              this.us.openSnackBar('Invoice Printed Successfully', 'success');
            }
            else if (message === 'close'){
              this.us.openSnackBar('Action Cancelled', 'warning');
            }
            this.clearSelection();
          });
        }
      });
    }
  }
  clearSelection(): void{
    this.selection.clear();
    this.selectedInvoice = {} as MvInvoice;
  }


  onRowClicked(row: any): void{
    this.selectedInvoice = { ...row };
    this.selection.toggle(row);
  }
}

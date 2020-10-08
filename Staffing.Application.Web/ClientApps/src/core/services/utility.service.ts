import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

 constructor(private snackBar: MatSnackBar
  ) {
  }

  openSnackBar(message: string, action: string): void{

    this.snackBar.open(message, 'close', {
      duration: 3000, // in milli-seconds
      panelClass: [action],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
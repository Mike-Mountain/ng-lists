import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SpinnerComponent} from "../components";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private dialogRef: MatDialogRef<SpinnerComponent> | undefined;

  constructor(private matDialog: MatDialog) {
  }

  openLoader() {
    this.dialogRef = this.matDialog.open(SpinnerComponent, {backdropClass: 'spinner-backdrop', panelClass: 'spinner-panel'});
  }

  closeLoader() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}

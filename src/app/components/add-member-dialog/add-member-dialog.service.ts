import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddMemberDialogComponent } from './add-member-dialog.component';

@Injectable({ providedIn: 'root' })
export class AddMemberDialogService {
  private dialogRef: MatDialogRef<AddMemberDialogComponent> | null = null;

  constructor(private readonly matDialog: MatDialog) {}

  openDialog() {
    this.dialogRef = this.matDialog.open(AddMemberDialogComponent, {
      maxWidth: 750,
      width: '100%',
    });
  }

  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}

import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from './create-project-dialog.component';

@Injectable({ providedIn: 'root' })
export class CreateProjectDialogService {
  private dialogRef: MatDialogRef<CreateProjectDialogComponent> | null = null;
  constructor(private readonly matDialog: MatDialog) {}

  openDialog() {
    this.dialogRef = this.matDialog.open(CreateProjectDialogComponent, {
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

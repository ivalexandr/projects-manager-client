import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthDialogComponent } from './auth-dialog.component';

@Injectable({ providedIn: 'root' })
export class AuthDialogService {
  private dialogRef: MatDialogRef<AuthDialogComponent> | null = null;
  constructor(private readonly dialog: MatDialog) {}

  openDialog() {
    this.dialogRef = this.dialog.open(AuthDialogComponent, {
      maxWidth: 700,
      width: '100%',
    });
  }

  closeDialog() {
    this.dialogRef?.close();
  }
}

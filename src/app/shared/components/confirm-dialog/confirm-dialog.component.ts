import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface ConfirmDialogData {
  title: string;
  dialog_text: string;
  yes_button_text: string;
  no_button_text: string;
}
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent   {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}
}

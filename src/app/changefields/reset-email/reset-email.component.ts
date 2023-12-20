import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrls: ['./reset-email.component.scss']
})
export class ResetEmailComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ResetEmailComponent>) {}

  ngOnInit(): void {
  }
  closeModal(): void {
    this.dialogRef.close();
  }

}

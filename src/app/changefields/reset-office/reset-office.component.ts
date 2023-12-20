import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-reset-office',
  templateUrl: './reset-office.component.html',
  styleUrls: ['./reset-office.component.scss']
})
export class ResetOfficeComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ResetOfficeComponent>) {}

  ngOnInit(): void {
  }
  closeModal(): void {
    this.dialogRef.close();
  }

}

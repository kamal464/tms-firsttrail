import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-reset-phonenumber',
  templateUrl: './reset-phonenumber.component.html',
  styleUrls: ['./reset-phonenumber.component.scss']
})
export class ResetPhonenumberComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ResetPhonenumberComponent>) { }

  ngOnInit(): void {
  }
  closeModal(): void {
    this.dialogRef.close();
  }

}

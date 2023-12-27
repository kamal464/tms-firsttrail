import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-resignationtasks-edit',
  templateUrl: './resignationtasks-edit.component.html',
  styleUrls: ['./resignationtasks-edit.component.scss']
})
export class ResignationtasksEditComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ResignationtasksEditComponent>) {}

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}

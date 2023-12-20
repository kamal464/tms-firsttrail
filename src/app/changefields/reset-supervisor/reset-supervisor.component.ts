import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-reset-supervisor',
  templateUrl: './reset-supervisor.component.html',
  styleUrls: ['./reset-supervisor.component.scss']
})
export class ResetSupervisorComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ResetSupervisorComponent>) { }

  ngOnInit(): void {
  }
  closeModal(): void {
    this.dialogRef.close();
  }
}

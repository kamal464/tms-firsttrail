import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-reset-new-promotion',
  templateUrl: './reset-new-promotion.component.html',
  styleUrls: ['./reset-new-promotion.component.scss']
})
export class ResetNewPromotionComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ResetNewPromotionComponent>) {}

  ngOnInit(): void {
  }
  closeModal(): void {
    this.dialogRef.close();
  }
}

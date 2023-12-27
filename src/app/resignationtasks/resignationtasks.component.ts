import { Component, OnInit } from '@angular/core';
import { ResignationtasksEditComponent } from '../resignationtasks-edit/resignationtasks-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-resignationtasks',
  templateUrl: './resignationtasks.component.html',
  styleUrls: ['./resignationtasks.component.scss']
})
export class ResignationtasksComponent implements OnInit {
  _currentAction = 'viewpop' ;
  dialog: any;
  constructor(private dialogg: MatDialog) { }

  ngOnInit(): void {
  }
  doAction(action): void {
    console.log(action,"sdfsdf")
    this._currentAction = action;
    if (action == 'popup') {
     this.openResignViewModal();
    } else if (action == 'cancel') {
    
      this._currentAction = 'view';
    } else if (action == 'save') {
     
      this._currentAction = 'view';
    
    }
  }

  openResignViewModal(): void {
    console.log('Opening openResignViewModal modal');
    const dialogRef = this.dialogg.open(ResignationtasksEditComponent, {
      width: '900px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('ResetEmailComponent modal closed');
      // Additional logic after the dialog is closed
    });
  }
}

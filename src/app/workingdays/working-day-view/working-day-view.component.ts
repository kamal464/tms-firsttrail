import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-working-day-view',
  templateUrl: './working-day-view.component.html',
  styleUrls: ['./working-day-view.component.scss']
})
export class WorkingDayViewComponent implements OnInit {

  _currentAction = 'view';
  _editIndex: number = -1;
  hasEdit:any = false;
  educationArray: any = [{ sdfdsfsd: 'dsffsd' }, { dsff: 'sdfs' }];
  constructor() {}

  ngOnInit(): void {}
  doAction(action): void {
    this._currentAction = action;
    console.log(action)
      switch (action) {
        case 'new':
      this._currentAction = action;
      
      break;
        case 'delete':
          this._currentAction = 'view';
          break;
        case 'edit':
          this._currentAction = action;
          break;
        case 'save':
          this._currentAction = 'view';
          this._editIndex = -1;
          break;
        case 'cancel':
          this._currentAction = 'view';
          this._editIndex = -1;
          break;
        default:
      }
    }

    
  startEdit(index: number) {
    this._editIndex = index;
    this.hasEdit = true;
  }
}

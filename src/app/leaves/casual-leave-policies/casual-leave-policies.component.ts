import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-casual-leave-policies',
  templateUrl: './casual-leave-policies.component.html',
  styleUrls: ['./casual-leave-policies.component.scss']
})
export class CasualLeavePoliciesComponent implements OnInit {

  @Input() _currentAction = 'view';
 @Output() onAction = new EventEmitter<any>();
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
          this.onAction.emit(action);
          break;
        default:
      }
    }

    
  startEdit(index: number) {
    this._editIndex = index;
    this.hasEdit = true;
  }
}

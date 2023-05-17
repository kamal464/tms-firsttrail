import { Component, OnInit,Input ,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-reasons',
  templateUrl: './reasons.component.html',
  styleUrls: ['./reasons.component.scss']
})
export class ReasonsComponent implements OnInit {
  _currentAction = 'view';
  errorMsg = '';
  isProcessing = false;
  _selected_option='ServerBaseFolder'
  _OptionsType = [
    { name: 'Code', value: 'Code', key: 'code' },
    { name: 'Text', value: 'Text', key: 'valuestr' },
    { name: 'Integer', value: 'Int', key: 'valueint' },
    { name: 'Decimal', value: 'Num', key: 'valuenum' },
  ];
  filteredReasons = [{"name":"ServerBaseFolder"},{
    "name":"DepartmentType"
  },];
  doAction(action): void {
    this._currentAction = action;
    if (action == 'edit') {
    } else if (action == 'cancel') {
      this.errorMsg = '';
      this._currentAction = 'view';
    } else if (action == 'save') {
      this._currentAction = 'edit';
    } else if (action == 'delete') {
      this._currentAction = 'view';
    }
  }
  constructor() { }
  doReason(action: any): void {
    this._selected_option = action;
  }
  ngOnInit(): void {
  }

}

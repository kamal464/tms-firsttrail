import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  _currentAction = 'view';
  errorMsg = '';
  isProcessing = false;
  _OptionsType = [
    { name: 'Code', value: 'Code', key: 'code' },
    { name: 'Text', value: 'Text', key: 'valuestr' },
    { name: 'Integer', value: 'Int', key: 'valueint' },
    { name: 'Decimal', value: 'Num', key: 'valuenum' },
  ];
  constructor() {}

  ngOnInit(): void {}
  doAction(action): void {
    this._currentAction = action;
    if (action == 'edit') {
    } else if (action == 'cancel') {
      this.errorMsg = '';
      this._currentAction = 'cancel';
    } else if (action == 'save') {
      this._currentAction = 'edit';
    } else if (action == 'delete') {
      this._currentAction = 'view';
    }
  }
}

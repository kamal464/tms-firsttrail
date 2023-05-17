import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-settingsitems',
  templateUrl: './settingsitems.component.html',
  styleUrls: ['./settingsitems.component.scss']
})
export class SettingsitemsComponent implements OnInit {
  @Input() currentSelectedReason = null;
  @Input() reasonToogle = false;
  @Output() onReasonUpdate = new EventEmitter<any>();

  displayedColumns = ['order', 'serialno', 'code', 'valuestr', 'valueint', 'controls'];
 
  _currentAction = 'view';
  errorMsg = '';
  isProcessing = false;
  
  serialno = 0;
  isLoading = false;
  _OptionsType = [
    { name: 'Code', value: 'Code', key: 'code' },
    { name: 'Text', value: 'Text', key: 'valuestr' },
    { name: 'Integer', value: 'Int', key: 'valueint' },
    { name: 'Decimal', value: 'Num', key: 'valuenum' },
  ];
  doAction(action): void {
    if (action == 'new') {
      this._currentAction = 'add';
      
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit,Input ,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-holidays-add',
  templateUrl: './holidays-add.component.html',
  styleUrls: ['./holidays-add.component.scss']
})
export class HolidaysAddComponent implements OnInit {
  @Input() _currentAction = 'new';
  @Output() onAction = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  doAction(action): void {
    this._currentAction = action;
    console.log(action)
      switch (action) {
        case 'delete':
          break;
        case 'edit':
          this._currentAction = action;
          break;
        case 'save':
          this._currentAction = 'view';
          
          break;
        case 'cancel':
          this._currentAction = 'view';
          this.onAction.emit(action);
          break;
        default:
      }
    
    }}


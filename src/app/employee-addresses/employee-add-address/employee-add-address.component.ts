import { Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-employee-add-address',
  templateUrl: './employee-add-address.component.html',
  styleUrls: ['./employee-add-address.component.scss']
})
export class EmployeeAddAddressComponent implements OnInit {
@Input() _currentAction = '';
@Output() onAction = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }


  doAction(action): void {
    this._currentAction = action;
    console.log(action)
    console.log(action)
      switch (action) {
        case 'delete':
          break;
        case 'edit':
          this._currentAction = action;
          break;
        case 'save':
          this._currentAction = 'view';
          this.onAction.emit(action);
          break;
        case 'cancel':
          this._currentAction = 'view';
          this.onAction.emit(action);
          break;
        default:
      }
    }



}

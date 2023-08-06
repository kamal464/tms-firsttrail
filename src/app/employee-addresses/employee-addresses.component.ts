import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-employee-addresses',
  templateUrl: './employee-addresses.component.html',
  styleUrls: ['./employee-addresses.component.scss']
})
export class EmployeeAddressesComponent implements OnInit,OnChanges {
_currentAction = 'view';
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(this._currentAction)
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
          break;
        case 'cancel':
          this._currentAction = 'view';
          break;
        default:
      }
    }

}

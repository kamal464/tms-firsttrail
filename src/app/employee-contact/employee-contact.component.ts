import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-contact',
  templateUrl: './employee-contact.component.html',
  styleUrls: ['./employee-contact.component.scss']
})
export class EmployeeContactComponent implements OnInit {
  _currentAction = 'view'; 
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
          break;
        default:
      }
    }

}

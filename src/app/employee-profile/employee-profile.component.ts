import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {
  _available_options : any=['PROFILE','ADDRESS','CONTACTS','DEPANDANTS','WORK EXPERIENCE','IDENTITIES','EDUCATION','HISTORY'];
  constructor() { }
  _selected_option = 'PROFILE';
  _currentAction = '';
  ngOnInit(): void {
  }


  selectOption(option) {
    this._selected_option = option;
    console.log(option,this._selected_option)
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

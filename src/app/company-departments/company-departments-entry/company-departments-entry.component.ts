import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-departments-entry',
  templateUrl: './company-departments-entry.component.html',
  styleUrls: ['./company-departments-entry.component.scss']
})
export class CompanyDepartmentsEntryComponent implements OnInit {
  _currentAction = 'view';
  department : any = []
  _departmentTypes = []
  _offices = [];
 
  constructor() { }

  ngOnInit(): void {
  }
  doAction(action): void {
this._currentAction = action;
    switch (action) {
      case 'delete':
        break;
      case 'edit':
        this._currentAction = action;
        break;
      case 'save':
        break;
      case 'cancel':
        break;
      default:
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { DynamicTabComponent } from '../shared/components/dynamic-tab/dynamic-tab.component';
@Component({
  selector: 'app-employee-resign',
  templateUrl: './employee-resign.component.html',
  styleUrls: ['./employee-resign.component.scss']
})
export class EmployeeResignComponent implements OnInit {
  _currentAction = 'new';
  constructor(private dynamictab:DynamicTabComponent) { }

  ngOnInit(): void {
  }
  doAction(action): void {
    this._currentAction = action;
    if (action == 'edit') {
     
    } else if (action == 'cancel') {
    
      this._currentAction = 'view';
    } else if (action == 'save') {
     
      this._currentAction = 'view';
    
    }
  }
}

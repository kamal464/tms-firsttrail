import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss'],
})
export class CompanyOverviewComponent implements OnInit {
  countries: [{ label: 'ind' }, { label: 'us' }, { label: 'aus' }];

  _currentAction = 'view';
  currentAction = 'view';
  isProcessing = false;
  hasNew = false;
  hasEdit = true;
  companyDetails: '';
  constructor() {}

  doAction(action: any): void {
    switch (action) {
      case 'edit':
        this._currentAction = action;
        break;
      case 'save':
        break;
      default:
        this._currentAction = 'view';
    }
  }

  ngOnInit(): void {}
}

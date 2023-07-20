import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-grades',
  templateUrl: './company-grades.component.html',
  styleUrls: ['./company-grades.component.scss']
})
export class CompanyGradesComponent implements OnInit {
  _currentAction = 'view';
  errorMsg = '';
  isProcessing = false;
  constructor() { }

  ngOnInit(): void {
  }

  doAction(action): void {
    if (action == 'new') {
      this._currentAction = 'add';
    }
  }

  cancelAdd(): void {
    this._currentAction = 'view';
  
  }
}

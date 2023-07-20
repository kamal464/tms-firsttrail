import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-designations',
  templateUrl: './company-designations.component.html',
  styleUrls: ['./company-designations.component.scss']
})
export class CompanyDesignationsComponent implements OnInit {
  _currentAction = 'view';
  errorMsg = '';
  isProcessing = false;
  serialno = 0;
  isLoading = false;
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

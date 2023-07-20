import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-identification-entry',
  templateUrl: './company-identification-entry.component.html',
  styleUrls: ['./company-identification-entry.component.scss']
})
export class CompanyIdentificationEntryComponent implements OnInit {
  _currentAction = 'view';
  _identificationTitle = '';
  errorMsg = '';
  isProcessing = false;
  _identificationTypes = [];
  _identificationIssuedBy = [];
  _attachments = [];
  _selectedAttachments = [];
  _removedAttachments = [];
  constructor() { }

  ngOnInit(): void {
  }
  doAction(action): void {
    this.errorMsg = '';
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

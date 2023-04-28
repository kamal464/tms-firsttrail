import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss'],
})
export class CompanyOverviewComponent implements OnInit {
countries : [
  {"label":"ind"},
  {"label":"us"},
  {"label":"aus"}
]

  _currentAction = 'view';
  currentAction = 'view';
  isProcessing = false;
  hasNew = false;
  hasEdit = true;
  companyDetails: FormGroup;
  constructor(private formBuilder: FormBuilder,) {
    this.companyDetails = this.formBuilder.group({
      legalname: [
        { value: '', disabled: this.isProcessing },
        Validators.required,
      ],
      name: [{ value: '', disabled: this.isProcessing }, Validators.required],
      fkcountrycode: [{ value: null, disabled: this.isProcessing }, Validators.required],
      phone: [{ value: '', disabled: this.isProcessing }],
      fax: [{ value: '', disabled: this.isProcessing }],
      email: [{ value: '', disabled: this.isProcessing }],
      website: [{ value: '', disabled: this.isProcessing }],
      whatsapp: [{ value: '', disabled: this.isProcessing }],
      linkedin: [{ value: '', disabled: this.isProcessing }],
      remarks: [{ value: '', disabled: this.isProcessing }],
    })

  }




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

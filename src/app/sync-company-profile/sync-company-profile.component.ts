import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sync-company-profile',
  templateUrl: './sync-company-profile.component.html',
  styleUrls: ['./sync-company-profile.component.scss']
})
export class SyncCompanyProfileComponent implements OnInit {
  _available_options : any= ['OVERVIEW','OFFICES','DEPARTMENTS','DEPARTMENT-TYPES','DESIGNATION','GRADES','IDENTIFICATIONS'];
  constructor() { }
  _selected_option = 'OVERVIEW';
  ngOnInit(): void {
  }


  selectOption(option) {
    this._selected_option = option;
    console.log(option,this._selected_option)
  }
}

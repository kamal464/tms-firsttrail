import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
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

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {
  _available_options : any=['PROFILE','ADDRESS','CONTACTS','DEPANDANTS','WORK EXPERIENCE','IDENTITIES','EDUCATION'];
  constructor() { }
  _selected_option = 'PROFILE';
  ngOnInit(): void {
  }


  selectOption(option) {
    this._selected_option = option;
    console.log(option,this._selected_option)
  }
}

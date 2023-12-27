import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
  _available_options : any= ['OVERVIEW','ADDRESS','CONTACTS','PROJECTS'];
  constructor() { }
  _selected_option = 'OVERVIEW';
  ngOnInit(): void {
  }
orgId=1;

  selectOption(option) {
    this._selected_option = option;
    console.log(option,this._selected_option)
  }
}

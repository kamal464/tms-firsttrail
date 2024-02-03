import { Component, OnInit } from '@angular/core';
import { ReasonDataService } from '../shared/services/reasondata.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  _available_options : any= ['OVERVIEW','OFFICES','DEPARTMENTS','DEPARTMENT-TYPES','DESIGNATION','GRADES','IDENTIFICATIONS'];
  constructor( private reason: ReasonDataService) { }
  _selected_option = 'OVERVIEW';
  ngOnInit(): void {
  // this.reason.getReason('officetype');
  // this.reason.getTableData('department',{fkofficeid:1695200343594});  
  }
orgId=1;

  selectOption(option) {
    this._selected_option = option;
    console.log(option,this._selected_option)
  }
}

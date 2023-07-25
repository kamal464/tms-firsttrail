import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api_Base,API_BASE_URL } from '../shared/api-config';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
@Component({
  selector: 'app-company-identifications',
  templateUrl: './company-identifications.component.html',
  styleUrls: ['./company-identifications.component.scss']
})
export class CompanyIdentificationsComponent implements OnInit {
  identificationsInfo: any = [];
  identityTypeDropdown:any;
  identityIssuedByDropdown:any;
  countries:any;
  isNew = false;
  selectedCountry:string;
  _attachments :any;
  _selectedAttachments:any;
  _currentAction = 'view';
idType:any;
idIssuedBy:any;
idIssuedDate:any;
idNumber:any;
idName:any;
idValidFromDate:any;
idValidUptoDate:any;
  constructor(private http : HttpClient) { }


  onDateSelected(event: MatDatepickerInputEvent<Date>) {
    this.idIssuedDate = event.value;
  }

  ngOnInit(): void {
    this.getIdentifications();
    this.getIdentityType();
    this.getIssuedBy();
    this.getCountries();
    
  }
  getCountries(){
    this.http.post(`${Api_Base}/utils/dropdown/country`,{}).subscribe((data =>{ console.log(data)
this.countries = data;
  
  }))
}
  _onDeleteOffice($event): void {
  
     
  }

getIdentifications(){
  this.http.post(`${API_BASE_URL}/t/identification/getall`,{}).subscribe((data)=>{
    this.identificationsInfo = data;
    console.log('identifications fetched')
  })
  
}

getIdentityType(){
  const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('filtername', 'fkreasonid')
      .set('filtervalue', '1689932317339');
  
    this.http.post(`${API_BASE_URL}/t/reasonitem/getall`, {}, { headers })
      .subscribe((data)=>{
this.identityTypeDropdown = data
console.log(this.identityTypeDropdown)
      })
}
getIssuedBy(){
  const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('filtername', 'fkreasonid')
      .set('filtervalue', '1689932687534');
  
    this.http.post(`${API_BASE_URL}/t/reasonitem/getall`, {}, { headers })
      .subscribe((data)=>{
this.identityIssuedByDropdown = data
console.log(this.identityIssuedByDropdown)
      })
}


addIdentity(){
  const timestamp = new Date().getTime(); 
    const requestBody = {
    id:timestamp,
    type:this.idType,
    issuedby:this.idIssuedBy,
    issuedate:this.idIssuedDate.getTime(),
    number:this.idNumber,
    name:this.idName,
    validfromdate:this.idValidFromDate.getTime(),
    validuptodate:this.idValidUptoDate.getTime(),
    fkcountrycode:this.selectedCountry,
    fkorgid:1,
    fkempid:null,
    sid:0,
    rss:0,
    ict:0,
    lmt:0,
    sct:0,
    smt:0
  }
  console.log(requestBody)
  this.http.post(`${API_BASE_URL}/t/identification/add`,requestBody).subscribe((data)=>{
    console.log('identity is added')
  })
}

doAction(action): void {
 this._currentAction = action;
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

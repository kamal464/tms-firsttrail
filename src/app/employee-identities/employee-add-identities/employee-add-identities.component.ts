import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Api_Base,API_BASE_URL } from 'src/app/shared/api-config';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
@Component({
  selector: 'app-employee-add-identities',
  templateUrl: './employee-add-identities.component.html',
  styleUrls: ['./employee-add-identities.component.scss']
})
export class EmployeeAddIdentitiesComponent implements OnInit {
  @Output() onAction = new EventEmitter<any>();
  @Input()employeeId :any;
  @Input() _currentAction = 'new';
  identificationsInfo: any = [];
  identityTypeDropdown:any;
  identityIssuedByDropdown:any;
  countries:any;
  isNew = false;
  selectedCountry:string;
  _attachments :any;
  _selectedAttachments:any;
  isSaveFormDataCalled=false;
idType:any;
idIssuedBy:any;
idIssuedDate:any;
idNumber:any;
idName:any;
idValidFromDate:any;
idValidUptoDate:any;
identitiesData:any=[];
  constructor(private http : HttpClient) { }
  onDateSelected(event: MatDatepickerInputEvent<Date>) {
    this.idIssuedDate = event.value;
  }
  handleInput(inputName: string, inputValue: string): void {
    console.log(inputName,inputValue)
    this.identitiesData[inputName] = inputValue;
  }

  ngOnInit(): void {
    
    this.getIdentifications();
    this.getIdentityType();
    this.getIssuedBy();
    // this.getCountries();
  }

  
  // public countrydata: any = [
  // ];
  // // maps the appropriate column to fields property
  // public fields: Object = { text: 'value', value: 'id' };
  // // set the height of the popup element
  // public height: string = '220px';
  // // set the placeholder to DropDownList input element
  // public watermark: string = 'Select a country';
  // // set the placeholder to filter search box input element
  // public filterPlaceholder: string = 'Search';
  // // filtering event handler to filter a Country
  // public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
  //     let query: Query = new Query();
  //     //frame the query based on search string with filter type.
  //     query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
  //     //pass the filter data source, filter query to updateData method.
  //     e.updateData(this.countrydata, query);
  // }
 





  // public identityType:any= [];
  // public typeFields: Object = { text: 'value', value: 'value' };
  //   // set the placeholder to DropDownList input element
  //   public typeWaterMark: string = 'Select a type';
  //   // set the height of the popup element
  //   public typeheight: string = '200px';



  // public identityissudby:any= [];
  // public issudbyFields: Object = { text: 'value', value: 'value' };
  //   // set the placeholder to DropDownList input element
  //   public issudbyWatermark: string = 'Select a type';
  //   // set the height of the popup element
  //   public issudbyHeight: string = '200px';










//   getCountries(){
//     this.http.post(`${Api_Base}/utils/dropdown/country`,{}).subscribe((data =>{ console.log(data)
// this.countries = data;
// // this.countrydata = data;
  
//   }))
// }

getIdentifications(){
  this.http.post(`${API_BASE_URL}/v1/identification/getall`,{}).subscribe((data)=>{
    this.identificationsInfo = data;
    console.log('identifications fetched')
  })
  
}

getIdentityType(){
  const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('filtername', 'fkreasonid')
      .set('filtervalue', '1689932317339');
  
    this.http.post(`${API_BASE_URL}/v1/reasonitem/getall`, {}, { headers })
      .subscribe((data)=>{
this.identityTypeDropdown = data
// this.identityType = data;
console.log(this.identityTypeDropdown)
      })
}
getIssuedBy(){
  const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('filtername', 'fkreasonid')
      .set('filtervalue', '1689932687534');
  
    this.http.post(`${API_BASE_URL}/v1/reasonitem/getall`, {}, { headers })
      .subscribe((data)=>{
this.identityIssuedByDropdown = data
// this.identityissudby = data;
console.log(this.identityIssuedByDropdown)
      })
}


addIdentity(){
  const timestamp = new Date().getTime(); 
  const formatDateField = (dateValue) => {
    if (!dateValue) {
      return null;
    }
    
    const dateObj = new Date(dateValue);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    
    return `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;
  };
    const requestBody = {
    id:timestamp,
    type:this.identitiesData.type,
    issuedby:this.identitiesData.issuedby|| null,
    issuedate:formatDateField(this.identitiesData.issuedate),
    number:this.identitiesData.number|| null,
    name:this.identitiesData.name|| null,
    validfromdate:formatDateField(this.identitiesData.validfromdate),
    validuptodate:formatDateField(this.identitiesData.validuptodate),
    fkcountrycode:this.identitiesData.fkcountrycode|| null,
    fkorgid:1,
    fkempid:this.employeeId,
    sid:0,
    rss:0,
    ict:0,
    lmt:0,
    sct:0,
    smt:0
  }
  console.log(requestBody)
  this.http.post(`${API_BASE_URL}/v1/identification/add`,requestBody).subscribe((data)=>{
    console.log('identity is added')
    this.identificationsInfo.push(data);
    this.idType = '',
    this.idIssuedBy = '',
    this.idIssuedDate = '',
    this.idNumber = '',
    this.idName = '',
    this.idValidFromDate = '',
    this.idValidUptoDate = '',
    this.selectedCountry = ''
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
      if (!this.isSaveFormDataCalled){
        this.isSaveFormDataCalled = true;
     this.addIdentity();
     this.onAction.emit(action);
      }
      break;
    case 'cancel':
      this._currentAction = 'view';
      this.onAction.emit(action);
      break;
    default:
      
  }

}







}




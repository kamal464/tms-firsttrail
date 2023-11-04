import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit,Input,Output } from '@angular/core';
import { SharedServiceService } from '../shared/shared-service.service';
import { Subscription } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Api_Base,API_BASE_URL } from 'src/app/shared/api-config';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { ThumbSettings } from '@syncfusion/ej2/charts';
@Component({
  selector: 'app-employee-identities',
  templateUrl: './employee-identities.component.html',
  styleUrls: ['./employee-identities.component.scss']
})
export class EmployeeIdentitiesComponent implements OnInit {
  countries :any=[];
  _currentAction = 'view';
  _editIndex:  number = -1;
  hasEdit:any = false;
  isProcessing = false;
  employeeId:any;
  _attachments = [];
  empIdentitesArray:any;
  identitiesData:any=[];
  private subscription: Subscription;
  constructor(private http:HttpClient,private cdr :ChangeDetectorRef,private sharedService:SharedServiceService) { }

  ngOnInit(): void {
    this.subscription = this.sharedService.employeeId$.subscribe((empid) => {
      this.employeeId = empid;
      if (this.employeeId) {
        console.log('Employee ID in Component B:', this.employeeId);
        // You can perform further actions with the employee ID here
      } else {
        console.log('Employee ID not set in Component B');
      }
    });
    this.getIdentities();
    this.getCountries();
    this.getIdentityType();
    this.getIssuedBy();
  }
  handleInput(inputName: string, inputValue: string): void {
    console.log(inputName,inputValue)
    this.identitiesData[inputName] = inputValue;
  }
  getIdentityType(){
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('filtername', 'fkreasonid')
        .set('filtervalue', '1689932317339');
    
      this.http.post(`${API_BASE_URL}/t/reasonitem/getall`, {}, { headers })
        .subscribe((data)=>{

  this.identityType = data;
 
        })
  }
  getIssuedBy(){
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('filtername', 'fkreasonid')
        .set('filtervalue', '1689932687534');
    
      this.http.post(`${API_BASE_URL}/t/reasonitem/getall`, {}, { headers })
        .subscribe((data)=>{

  this.identityissudby = data;

        })
  }

  public countrydata: any = [
  ];
  // maps the appropriate column to fields property
  public fields: Object = { text: 'value', value: 'id' };
  // set the height of the popup element
  public height: string = '220px';
  // set the placeholder to DropDownList input element
  public watermark: string = 'Select a country';
  // set the placeholder to filter search box input element
  public filterPlaceholder: string = 'Search';
  // filtering event handler to filter a Country
  public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
      let query: Query = new Query();
      //frame the query based on search string with filter type.
      query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
      //pass the filter data source, filter query to updateData method.
      e.updateData(this.countrydata, query);
  }
 





  public identityType:any= [];
  public typeFields: Object = { text: 'value', value: 'id' };
    // set the placeholder to DropDownList input element
    public typeWaterMark: string = 'Select a type';
    // set the height of the popup element
    public typeheight: string = '200px';



  public identityissudby:any= [];
  public issudbyFields: Object = { text: 'value', value: 'id' };
    // set the placeholder to DropDownList input element
    public issudbyWatermark: string = 'Select a type';
    // set the height of the popup element
    public issudbyHeight: string = '200px';









  getCountries(){
    this.http.post(`${Api_Base}/utils/dropdown/country`,{}).subscribe((data =>{ console.log(data)
this.countrydata = data;

  
  }))
}
  startEdit(index: number) {
    this._editIndex = index;
    this.hasEdit = true;
  }
  doAction(action): void {
    this._currentAction = action;
    console.log(action)
      switch (action) {
        case 'new':
      this._currentAction = action;
      
      break;
        case 'delete':
          this._currentAction = 'view';
          break;
        case 'edit':
          this._currentAction = action;
          break;
        case 'save':
          this._currentAction = 'view';
          this._editIndex = -1;
          break;
        case 'cancel':
          this._currentAction = 'view';
          this._editIndex = -1;
          break;
        default:
      }
    }


getIdentities(){
  this.http.post(`${API_BASE_URL}/t/identification/getall`,{}).subscribe((data)=>{
    console.log(data,"getIdentites");
    if (Array.isArray(data) && data.some(item => item.fkempid === this.employeeId)) {
      // Filter the data to get items with 'fkempid' equal to 1693465985040
      const filteredData = data.filter(item => item.fkempid === this.employeeId);
      console.log(filteredData);
      this.empIdentitesArray = filteredData;
    } else {
      console.log("fkempid not found in the response data");
    }

  })
}

// updateIdentification(item){
//   const formatDateField = (dateValue) => {
//     if (!dateValue) {
//       return null;
//     }
    
//     const dateObj = new Date(dateValue);
//     const year = dateObj.getFullYear();
//     const month = dateObj.getMonth() + 1;
//     const day = dateObj.getDate();
//     console.log(year,month,day)
//     return `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;

//   };
//   const requestBody = {
//     id: item.id,
//     fkcountrycode:this.identitiesData.fkcountrycode?this.identitiesData.fkcountrycode:item.fkcountrycode,
//     type: this.identitiesData.type?this.identitiesData.type:item.type,
//     issuedby: this.identitiesData.issuedby?this.identitiesData.issuedby:item.issuedby,
//     issuedate: formatDateField(this.identitiesData.issuedate?this.identitiesData.issuedate:item.issuedate),
//     number:this.identitiesData.number?this.identitiesData.number: item.number,
//     name: this.identitiesData.name?this.identitiesData.name:item.name,
//     validfromdate: formatDateField(this.identitiesData.validfromdate?this.identitiesData.validfromdate:item.validfromdate),
//     validuptodate: formatDateField(this.identitiesData.validuptodate?this.identitiesData.validuptodate:item.validuptodate),
//     fkorgid: 1,
//     fkempid: item.fkempid,
//   };
//   this.http.post(`${API_BASE_URL}/t/identification/update` , requestBody).subscribe((data)=>{
//     console.log(data, 'data is updated')
//   })
// }
updateIdentification(item) {
  console.log(item,'updateidentification')
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
    id: item.id,
    fkcountrycode: this.identitiesData.fkcountrycode !== undefined ? this.identitiesData.fkcountrycode : item.fkcountrycode,
    type: this.identitiesData.type !== undefined ? this.identitiesData.type : item.type,
    issuedby: this.identitiesData.issuedby !== undefined ? this.identitiesData.issuedby : item.issuedby,
    issuedate:this.identitiesData.issuedate? formatDateField(this.identitiesData.issuedate) : item.issuedate,
    number: this.identitiesData.number !== undefined ? this.identitiesData.number : item.number,
    name: this.identitiesData.name !== undefined ? this.identitiesData.name : item.name,
    validfromdate: this.identitiesData.validfromdate?formatDateField(this.identitiesData.validfromdate ): item.validfromdate,
    validuptodate: this.identitiesData.validuptodate? formatDateField(this.identitiesData.validuptodate  ): item.validuptodate,
    fkorgid: 1,
    fkempid: item.fkempid,
  };

  this.http.post(`${API_BASE_URL}/t/identification/update`, requestBody).subscribe((data) => {
    console.log(requestBody,'data is updated')
    console.log(data, 'data is updated');
  });
}


deleteIdentity(deleteid:number){
  const deletefield = this.empIdentitesArray.find((item)=>item.id === deleteid);
  console.log(deletefield)
  const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('id', deletefield.id.toString());

this.http.post(`${API_BASE_URL}/t/identification/delete`,{},{headers}).subscribe((data)=>{
  console.log('identity is deleted',data)
  this.empIdentitesArray.pop(data);
})

}



}

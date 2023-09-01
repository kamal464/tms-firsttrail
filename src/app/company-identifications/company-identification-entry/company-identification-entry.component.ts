import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { API_BASE_URL,Api_Base } from 'src/app/shared/api-config';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
@Component({
  selector: 'app-company-identification-entry',
  templateUrl: './company-identification-entry.component.html',
  styleUrls: ['./company-identification-entry.component.scss']
})
export class CompanyIdentificationEntryComponent implements OnInit {
@Input()identificationsInfo : any=[];
@Input()identityTypeDropdown : any=[];
@Input()identityIssuedByDropdown : any=[];
@Input()countries :any=[];
@Output() onDelete = new EventEmitter<any>();
  _currentAction = 'view';
  _identificationTitle = '';
  selectedCountry:string;
  errorMsg = '';
  isProcessing = false;
  _identificationTypes = [];
  _identificationIssuedBy = [];
  _attachments = [];
  _selectedAttachments = [];
  _removedAttachments = [];
 idissueDate:any
 idFromDate:any;
 idValidUpto:any;
  constructor(private http:HttpClient) {
    this.countrydata = this.countrydata.concat(this.countries);
    this.identityType = this.identityType.concat(this.identityTypeDropdown);
    this.identityissudby = this.identityissudby.concat(this.identityIssuedByDropdown);
 console.log(this.countries)
   }

  ngOnInit(): void {
    
    
   
      this.countrydata = this.countrydata.concat(this.countries);
      this.identityType = this.identityType.concat(this.identityTypeDropdown);
      this.identityissudby = this.identityissudby.concat(this.identityIssuedByDropdown);
   console.log(this.countries)
  }
 
  _doDelete(): void {
    console.log(this.identificationsInfo.id)
    this.onDelete.emit(this.identificationsInfo.id);
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




  updateIdentification(){
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
      id: this.identificationsInfo.id,
      fkcountrycode:this.selectedCountry,
      type: this.identificationsInfo.type,
      issuedby: this.identificationsInfo.issuedby,
      issuedate: formatDateField(this.idissueDate),
      number: this.identificationsInfo.number,
      name: this.identificationsInfo.name,
      validfromdate: formatDateField(this.idFromDate),
      validuptodate: formatDateField(this.idValidUpto),
      fkorgid: 1,
      fkempid: null,
    };
    this.http.post(`${API_BASE_URL}/t/identification/update` , requestBody).subscribe((data)=>{
      console.log(data, 'data is updated')
    })
  }


  doAction(action): void {
    this._currentAction = action;
    this.errorMsg = '';
    switch (action) {
      case 'delete':
        this. _doDelete();
        break;
      case 'edit':
        this._currentAction = action;
        break;
      case 'save':
        this.updateIdentification();
        this._currentAction = 'view'; 
        break;
      case 'cancel':
        this._currentAction = 'view';
        break;
      default:
        
    }
  
  }
}

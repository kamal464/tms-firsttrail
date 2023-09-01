import { Component, OnInit,Input,EventEmitter, Output,ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormControl ,FormGroup,Validators} from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api_Base,API_BASE_URL } from 'src/app/shared/api-config';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OfficesComponent implements OnInit {
@Input() officeTypeArray :any = [];
@Input() countries : any =[];
@Input() offices= null;

@Output() onDelete = new EventEmitter<any>();
// @Input() address = null;
officesArray:any = [];
  code:string;
  selectedCountry :string;
  currentAction = 'view';
  hasNew = false;
  hasEdit = true;
  idToValueMap: any = {};


  constructor(  private http: HttpClient) {
  }


saveOff(){
 
}


  doAction(action: any): void {
    this.currentAction = action;
    switch (action) {
      case 'edit':
        this.currentAction = action;
        break;
      case 'save':
        break;
      default:
        this.currentAction = 'view';
    }
  }
  _doDelete(): void {
    this.onDelete.emit(this.offices.office.id);
  }

  ngOnInit(): void {
  //  console.log(this.address)
  this.getCountries();
   console.log(this.officeTypeArray,'officeType')
   this.officeType = this.officeType.concat(this.officeTypeArray);
   console.log(this.officeType)

   this.createIdToValueMap();
  }
  
  createIdToValueMap() {
    this.idToValueMap = {};
    this.officeTypeArray.forEach(item => {
      this.idToValueMap[item.id] = item.value;
    });
  }


  public countrydata: any = [ ];

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


  getCountries(){
    this.http.post(`${Api_Base}/utils/dropdown/country`,{}).subscribe((data  =>{
 
  this.countrydata = data

  
  }))
  }

  
  public officeType:any= [];
  public localFields: Object = { text: 'value', value: 'id' };
  
    // set the placeholder to DropDownList input element
    public localWaterMark: string = 'Select a type';
    // set the height of the popup element
    public localheight: string = '200px';
  
  



  updateOffice(offices){
    const requestBody = {
     id:offices.id,
     code:offices.code,
     name:offices.name,
     type:offices.type,
     fkorgid:offices.fkorgid

    }
    this.http.post(`${API_BASE_URL}/t/office/update`, requestBody).subscribe((data)=>{
      console.log(data)
      
    })
    this.updateAddress();
  }
updateAddress(){
  const requestbody = {
    id: this.offices.address.id,
    fkorgid : 1,
    fkofficeid : this.offices.address.fkofficeid,
    type: null ,
    contactname: null,
    description : null,
    houseno:this.offices.address.houseno,
    building :this.offices.address.building,
    street:this.offices.address.street,
    locality:null,
    landmark:this.offices.address.landmark,
    area:this.offices.address.area,
    city:this.offices.address.city,
    postalcode:this.offices.address.postalcode,
    region:null,
    zone:null,
    fkcountrycode:this.offices.address.fkcountrycode,
    latitude:null,
    longitude:null,
    phone:null,
    email:null,
    fax:null,
    isactive:1
  
  }
  this.http.post(`${API_BASE_URL}/t/address/update` , requestbody).subscribe((data)=>{
    console.log(data,'updated')
  })
}

  
}

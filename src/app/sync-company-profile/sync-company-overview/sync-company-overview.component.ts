import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KitUiTextEditComponent } from 'src/app/kit-ui-text-edit/kit-ui-text-edit.component';
import { Api_Base,API_BASE_URL } from 'src/app/shared/api-config';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons/src';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';

interface Country {
  value: string;
  id: string;
  // Other properties specific to the country
}
@Component({
  selector: 'app-sync-company-overview',
  templateUrl: './sync-company-overview.component.html',
  styleUrls: ['./sync-company-overview.component.scss',
]
})
export class SyncCompanyOverviewComponent implements OnInit {
  @ViewChild('KitUiTextEditComponent') child: KitUiTextEditComponent;
 
  savedData: any = [];
  countries : any =[];
  getall:any = [];
  items: string[] = [];
  inputValues: string[] = [];
  getData: any = [];
  formData: any = [];
  _currentAction = 'view';
  currentAction = 'view';

  hasNew = false;
  hasEdit = true;
  companyDetails: '';
  getRecord() {
    this.http
      .post(`${API_BASE_URL}/t/org/getall`, {})
      .subscribe((data: any) => {
        this.getall = data;
        console.log(data,this.getall);
       
      });
  }
  handleInput(inputName: string, inputValue: string): void {
    this.formData[inputName] = inputValue;
  }

  onAddData(data: string) {
    // Call your post method here and pass the data to it
    console.log(data);
  }
  addInputValue(value: string) {
    this.inputValues.push(value);
  }
  onSave() {
    console.log(this.inputValues.slice(-1));
    console.log(this.formData);
    // this.onAdd();
   
    // this.childComponent.callPostMethod();
    // console.log(this.items)
    // console.log(this.savedData)
  }

  // getRecord(){
  //   this.http.post('http://192.168.0.58:5000/org/getorg',{}).subscribe((data =>{ console.log(data)
  // this.getData = data;
  // console.log(this.getData)
  // console.log(this.formData)

  // }))
  // }




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













  onUpdate() {
    console.log(this.formData)
const requestbody = {
  id : 1,
  code:this.formData.code? this.formData.code : this.getall[0].code , 
  name : this.formData.name? this.formData.name : this.getall[0].name,
  legalname : this.formData.legalname? this.formData.legalname : this.getall[0].legalname, 
 fkcountrycode : this.formData.fkcountrycode? this.formData.fkcountrycode : this.getall[0].fkcountrycode,
 contactname : this.formData.contactname? this.formData.contactname : this.getall[0].contactname,
 email:this.formData.email? this.formData.email : this.getall[0].email,
 phone: this.formData.phone? this.formData.phone : this.getall[0].phone,
 fax:this.formData.fax? this.formData.fax : this.getall[0].fax,
 website : this.formData.website? this.formData.website : this.getall[0].website,
 comments:this.formData.comments? this.formData.comments : this.getall[0].comments,
 whatsapp : this.formData.whatsapp? this.formData.whatsapp : this.getall[0].whatsapp,
 linkedin : this.formData.linkedin? this.formData.linkedin : this.getall[0].linkedin,
 type:this.formData.type? this.formData.type : this.getall[0].type,
 golivedate:this.formData.golivedate? this.formData.golivedate : this.getall[0].golivedate,
sid: this.getall[0].sid,
rss:  this.getall[0].rss,
lct : this.getall[0].lct,
lmt : this.getall[0].lmt ,
sct : this.getall[0].sct ,
smt :  this.getall[0].smt,
}

// const requestbody = {
//   "name": "Virinchi Infra",
//   "whatsapp": "",
//   "lmt": 1685126240,
//   "legalname": "Virinchi Infra Private Limited",
//   "linkedin": null,
//   "sct": 1685126240,
//   "fkcountrycode": "IN",
//   "comments": "State-of-art development center located at Hyderabad, DTPL has been able to serve its clients effectively and efficiently worldwide.",
//   "smt": 1685126240,
//   "contactname": null,
//   "type": 1,
//   "phone": "",
//   "golivedate": 1,
//   "email": "rsd@vipl.com",
//   "sid": 0,
//   "code": "VIPL",
//   "fax": "",
//   "rss": 0,
//   "id": 1,
//   "website": "",
//   "lct": 1685126240
// }


console.log(requestbody)
    this.http
      .post(`${API_BASE_URL}/t/org/update`, requestbody)
      .subscribe();
    // console.log(myJSON);
  }
  
  onDataChanged(data: any) {
    this.savedData = data;
  }
 

 

  constructor(private http: HttpClient) {}

  doAction(action: any): void {
    switch (action) {
      case 'edit':
        this.currentAction = action;
        break;
      case 'save':
        this.currentAction = 'view';
        break;
      default:
        this.currentAction = 'view';
    }
  }
  getCountries(){
    this.http.post(`${Api_Base}/utils/dropdown/country`,{}).subscribe((data  =>{
  this.countries = data;
  this.countrydata = data
console.log(this.countries)
console.log(this.countrydata)
  
  }))
  }


  ngOnInit(): void {
    this.getRecord();
    this.getCountries();
  }
}

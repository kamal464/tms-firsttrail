import { Component, OnInit } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api_Base,API_BASE_URL } from '../shared/api-config';
import { Query } from '@syncfusion/ej2-data';
// import { EmitType } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base/src/base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
@Component({
  selector: 'app-company-offices',
  templateUrl: './company-offices.component.html',
  styleUrls: ['./company-offices.component.scss']
})
export class CompanyOfficesComponent implements OnInit {
  currentAction = 'view';
 sendBody:any;
  mergedArray :any;
  officesArray:any = [];
  addressArray:any = [];
  countries :any = [];
  selectedCountry:string;
  _officesInfo: any = [];
  isNew = false;
  officeTypeArray :any = [];
  _officesEditSet= "";
  code:string;
  officeTitle :string;
  officeName : string;
  officeType :string;
  flatNo : any;
  buildingName : string;
  roadName : string ;
  landMark:string;
  location : string;
  city:string;
  country:string;
  pincode:number;
 
  constructor(  private http : HttpClient) {}
   

  ngOnInit(): void {
    this.getOfficeType();
    this.getCountries();
    this.getOffice();
    this.getAddress();
      this.OfficesArray =  this.OfficesArray.concat(this.officeTypeArray);
    this.countrydata  = this.countrydata.concat(this.countries);
  }



  handleInput(inputName: string, inputValue: string): void {
    console.log(inputName,inputValue)
    this.sendBody = {
      ...this.sendBody,
      [inputName]:inputValue
    }
console.log(this.sendBody);
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





  public OfficesArray:any= [
    
  ];
  
  
    public localFields: Object = { text: 'value', value: 'id' };
      // set the placeholder to DropDownList input element
      public localWaterMark: string = 'Select a type';
      // set the height of the popup element
      public localheight: string = '200px';
    

  doAction(action: any): void {
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

  getOfficeType() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('filtername', 'fkreasonid')
      .set('filtervalue', '1689662340365');
  
      this.http.post(`${API_BASE_URL}/t/reasonitem/getall`, {}, { headers })
      .subscribe(
        (data) => {
          this.officeTypeArray = [];
    
          // Loop through the properties of the data object
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              const item = data[key];
              if (item.id && item.value) {
                this.officeTypeArray.push({
                  id: item.id,
                  value: item.value
                });
              }
            }
          }
    this.OfficesArray = this.officeTypeArray;
          console.log(this.officeTypeArray, 'officetypearray');
        }
      );
    
  }

  getCountries(){
    this.http.post(`${Api_Base}/utils/dropdown/country`,{}).subscribe((data =>{ console.log(data)
this.countries = data;
this.countrydata =data;
  
  }))
  }
  getOffice() {
    this.http.post(`${API_BASE_URL}/t/office/getall`, {}).subscribe(
      (data) => {
        this.officesArray = data;
        console.log(data);
        this.combineData();
      },
      (error) => {
        console.error('Error retrieving office data:', error);
      }
    );
  }
  
  getAddress() {
    this.http.post(`${API_BASE_URL}/t/address/getall`, {}).subscribe((data) => {
      this.addressArray = data;
      console.log(data);
      this.combineData();
    });
  }
  combineData() {
    if (this.officesArray) {
      const combinedArray = [];
      for (const address of this.addressArray) {
        console.log(address.fkofficeid);
        const officeId = address.fkofficeid;
        const office = this.officesArray.find((office) => office.id === officeId);
        const combinedObject = {
          officeId,
          office,
          address,
        };
        combinedArray.push(combinedObject);
      }
      this.mergedArray = combinedArray
      console.log(combinedArray);
      // Use the combinedArray as needed
    }
  }


  
addOffice(){
  const timestamp = new Date().getTime(); 
  const requestBody = {
    id: timestamp,
    fkorgid:1,
    code:this.sendBody.code,
    name:this.sendBody.name,
    type:this.sendBody.type
    
  }

  this.http.post(`${API_BASE_URL}/t/office/add` , requestBody).subscribe((data)=>{
    console.log(data)
    this.officesArray.push(data)
    console.log(this.officesArray)
    this.officeTitle = '',
    this.officeName = '',
    this.officeType = ''

  })
  console.log('office added' ,requestBody)
  this.addOfficeAddress(requestBody.id)
}

addOfficeAddress(fkofficeid){
  const timestamp = new Date().getTime(); 
  const requestbody = {
    id: timestamp,
    fkorgid : 1,
    fkofficeid : fkofficeid,
    type: null ,
    contactname: null,
    description : null,
    houseno:this.sendBody.houseno,
    building :this.sendBody.building,
    street:this.sendBody.street,
    locality:null,
    landmark:this.sendBody.landmark,
    area:this.sendBody.area,
    city:this.sendBody.city,
    postalcode:this.sendBody.postalcode,
    region:null,
    zone:null,
    fkcountrycode:this.sendBody.fkcountrycode,
    latitude:null,
    longitude:null,
    phone:null,
    email:null,
    fax:null,
    isactive:1
  
  }
  this.http.post(`${API_BASE_URL}/t/address/add` , requestbody).subscribe((data)=>{
    console.log('data' , 'address added')
 
    this.combineData();
    console.log(requestbody)
  })
}






_onDeleteOffice($event): void {
  this.deleteAddress($event)
   
}
deleteAddress(officeId: number) {
  const combinedObject = this.mergedArray.find((item) => item.officeId === officeId);

  if (combinedObject) {
    const addressId = combinedObject.address.id;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('id', addressId.toString());

    console.log(addressId);

    this.http.post(`${API_BASE_URL}/t/address/delete`, {}, { headers }).subscribe(
      (data) => {
        console.log('Address is deleted', addressId);
        this.deleteOffice(officeId);
        this.mergedArray = this.mergedArray.filter((item) => item.address.id !== addressId);
      }
    );
  }
}

deleteOffice(officeId: number) {
  const combinedObject = this.mergedArray.find((item) => item.officeId === officeId);

  if (combinedObject) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('id', officeId.toString());

    console.log(officeId);

    this.http.post(`${API_BASE_URL}/t/office/delete`, {}, { headers }).subscribe(
      (data) => {
        console.log('Office is deleted', officeId);
        this.mergedArray = this.mergedArray.filter((item) => item.office.id !== officeId);
      }
    );
  }
}

}

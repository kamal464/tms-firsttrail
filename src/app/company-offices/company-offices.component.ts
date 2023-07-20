import { Component, OnInit } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api_Base,API_BASE_URL } from '../shared/api-config';
@Component({
  selector: 'app-company-offices',
  templateUrl: './company-offices.component.html',
  styleUrls: ['./company-offices.component.scss']
})
export class CompanyOfficesComponent implements OnInit {
  currentAction = 'view';
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
  }


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
        (data)=> {
          this.officeTypeArray = data;
        
        }
      )
  }

  getCountries(){
    this.http.post(`${Api_Base}/utils/dropdown/country`,{}).subscribe((data =>{ console.log(data)
this.countries = data;
  
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
    if (this.officesArray && this.addressArray) {
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


  
  // getOffice() {
  //   this.http.post(`${API_BASE_URL}/t/office/getall`, {}).subscribe(
  //     (data) => {
  //       this.officesArray = data;
  //       console.log(data);
  //     },
  //     (error) => {
  //       console.error('Error retrieving office data:', error);
  //     }
  //   );
  // }

  // getAddress() {
  //   this.http.post(`${API_BASE_URL}/t/address/getall`, {}).subscribe((data) => {
  //     this.addressArray = data;
  // console.log(data)
      
  //   });
  // }
  
// // Fetch associated office data for each address
      // this.addressArray.forEach((address) => {
      //   const officeId = address.officeId;
  
      //   // Find the associated office using officeId
      //   const associatedOffice = this.officesArray.find((office) => office.id === officeId);
  
      //   // Assign the associated office to the address
      //   address.office = associatedOffice;
      // });
addOffice(){
  const timestamp = new Date().getTime(); 
  const requestBody = {
    id: timestamp,
    fkorgid:1,
    code:this.officeTitle,
    name:this.officeName,
    type:this.officeType
    
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

// findOfficeById(officeId: number): any {
//   console.log(officeId);
//   if (this.officesArray) {
//     return this.officesArray.find((office) => office.id === officeId);
//   }
//   return null;
// }

addOfficeAddress(fkofficeid){
  const timestamp = new Date().getTime(); 
  const requestbody = {
    id: timestamp,
    fkorgid : 1,
    fkofficeid : fkofficeid,
    type: null ,
    contactname: null,
    description : null,
    houseno:this.flatNo,
    building :this.buildingName,
    street:this.roadName,
    locality:null,
    landmark:this.landMark,
    area:this.location,
    city:this.city,
    postalcode:this.pincode,
    region:null,
    zone:null,
    fkcountrycode:this.selectedCountry,
    latitude:null,
    longitude:null,
    phone:null,
    email:null,
    fax:null,
    isactive:1
  
  }
  this.http.post(`${API_BASE_URL}/t/address/add` , requestbody).subscribe((data)=>{
    console.log('data' , 'address added')
    this.addressArray.push(data);
    this.flatNo = '';
    this.buildingName = '';
    this.roadName = '';
    this.landMark = '';
    this.location = '';
    this.city = '';
    this.pincode = null;
    this.selectedCountry = null;
    this.combineData();
    console.log(requestbody)
  })
}


// deleteAddress() {
//   if (this.offices && this.offices.address && this.offices.address.id) {
//     const headers = new HttpHeaders()
//       .set('Content-Type', 'application/json')
//       .set('id', this.offices.address.id.toString());

//     console.log(this.offices.address.id);

//     this.http.post(`${API_BASE_URL}/t/address/delete`, {}, { headers }).subscribe(
//       (data) => {
//         console.log('Address is deleted', this.offices.address.id);
//         this.deleteOffice();

//         // Remove the deleted address from this.offices
//         delete this.offices.address;
//       }
//     );
//   }
// }


// deleteOffice(){
// const headers = new HttpHeaders()
//     .set('Content-Type', 'application/json')
//     .set('id', [this.offices.office.id]);
//     console.log(this.offices.office.id) 
// this.http.post(`${API_BASE_URL}/t/office/delete`,{},{headers}).subscribe(
//   (data) => {
//     delete this.offices.office;
//   }
// )
// console.log('office is deleted',this.offices.id)
// }

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

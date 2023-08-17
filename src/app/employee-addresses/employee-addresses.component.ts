import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { API_BASE_URL,Api_Base } from '../shared/api-config';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { SharedServiceService } from '../shared/shared-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-addresses',
  templateUrl: './employee-addresses.component.html',
  styleUrls: ['./employee-addresses.component.scss']
})
export class EmployeeAddressesComponent implements OnInit,OnChanges {
_currentAction = 'view';

hasEdit:any = false;
private subscription : Subscription;
 _editIndex:  number = -1;
addressId:any;
employeeId:any;
addressArray:any=[];
countriesArray:any;
selectedAddress:any;
addressTypeArray:any;
  constructor(private http: HttpClient,private sharedService:SharedServiceService) { }

  ngOnInit(): void {
    this.getCountries();
this.getAddress();
this.getAddressType();

this.subscription = this.sharedService.employeeId$.subscribe((empid) => {
  this.employeeId = empid;
  if (this.employeeId) {
    console.log('Employee ID in Component B:', this.employeeId);
    // You can perform further actions with the employee ID here
  } else {
    console.log('Employee ID not set in Component B');
  }
});



  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(this._currentAction)
  }
  startEdit(index: number , addressid : number) {
    this._editIndex = index;
    this.addressId = addressid;
    console.log(addressid)
    console.log(index)
    this.hasEdit = true;
  }

  doAction(action): void {
    // this._currentAction = action;
    console.log(action);
    switch (action) {
      case 'new':
      this._currentAction = action;
      break;
      case 'edit':
        this._currentAction = action;
        break;
      case 'save':
      case 'cancel':
        this._currentAction = 'view';
        this._editIndex = -1;
        break;
      default:
        break;
      }
    }


    getCountries(){
      this.http.post(`${Api_Base}/utils/dropdown/country`,{}).subscribe((data =>{ console.log(data)
  this.countriesArray = data;
    
    }))
    }
    getAddress() {
      this.http.post(`${API_BASE_URL}/t/address/getall`, {}).subscribe((data: any[]) => {
        data.forEach(item => {
          if (item.hasOwnProperty('fkempid') && item.fkempid == this.employeeId  && item.fkempid !== null && item.fkempid !== '') {
            console.log(item);
this.addressArray.push(item);
console.log(this.addressArray);

          }
        });
      });
    }
    
    getAddressType(){
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('reason', 'AddressType');
    
      this.http.post(`${Api_Base}/utils/dropdown/reason`, {}, { headers }).subscribe(
        (data: any) => {
          this.addressTypeArray = data;
          console.log(this.addressTypeArray)
          console.log(data);
        },
        
      );
    }


updateAddress(address){
  const requestbody = {
    id: address.id,
    fkorgid : 1,
    fkofficeid : address.fkofficeid,
    type: this.selectedAddress ,
    contactname: null,
    description : null,
    houseno:address.houseno,
    building :address.building,
    street:address.street,
    locality:null,
    landmark:address.landmark,
    area:address.area,
    city:address.city,
    postalcode:address.postalcode,
    region:null,
    zone:null,
    fkcountrycode:address.fkcountrycode,
    latitude:null,
    longitude:null,
    phone:null,
    email:null,
    fax:null,
    isactive:1,
  fkempid:this.employeeId
  }

  this.http.post(`${API_BASE_URL}/t/address/update` , requestbody).subscribe((data)=>{
    console.log(data)
  })
  console.log(requestbody)
}

    doDelete(fkempid){
this.deleteAddress(fkempid);
    }

    deleteAddress(id: number) {
      const combinedObject = this.addressArray.find((item) => item.id === id);
    console.log(id)
      if (combinedObject) {
        const addressId = combinedObject.id;
        console.log(addressId);
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('id', addressId.toString());
  
    
        this.http.post(`${API_BASE_URL}/t/address/delete`, {}, { headers }).subscribe(
          (data) => {
            console.log('Address is deleted', addressId);
            this.addressArray = this.addressArray.filter((item) => item.id !== addressId );
          }
          );
      }
    }
    

}

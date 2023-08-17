import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';
import { Api_Base,API_BASE_URL } from 'src/app/shared/api-config';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-employee-add-address',
  templateUrl: './employee-add-address.component.html',
  styleUrls: ['./employee-add-address.component.scss']
})
export class EmployeeAddAddressComponent implements OnInit {
 @Input()addressArray:any=[];
@Input() _currentAction = '';
private subscription: Subscription;
@Output() onAction = new EventEmitter<any>();
  constructor(private http : HttpClient,private sharedService:SharedServiceService) { }
  employeeId:number;
 @Input() countries :any = [];
 selectedCountry:any;
 addressTypeArray:any = [];
 SelectedAddressType:any;
 flatNo : any;
  buildingName : string;
  roadName : string ;
  landMark:string;
  location : string;
  city:string;
  country:string;
  pincode:number;
  private isSaveFormDataCalled = false;
  ngOnInit(): void {
    
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

  doAction(action): void {
    this._currentAction = action;
    console.log(action)
    console.log(action)
      switch (action) {
        case 'delete':
          break;
        case 'edit':
          this._currentAction = action;
          break;
        case 'save':
          if (!this.isSaveFormDataCalled){
          this.addAddress();
          this._currentAction = 'view';
          this.isSaveFormDataCalled = true;
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

addAddress(){
  
    const timestamp = new Date().getTime(); 
    const requestbody = {
      id: timestamp,
      fkorgid : 1,
      fkofficeid : null,
      type: this.SelectedAddressType ,
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
      isactive:1,
    fkempid:this.employeeId
    }
  

  this.http.post(`${API_BASE_URL}/t/address/add`, requestbody).subscribe((data)=>{console.log(data,"added address")
this.addressArray.push(data);
});
}




}

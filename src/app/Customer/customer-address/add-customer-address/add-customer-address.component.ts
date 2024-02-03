import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';
import { Api_Base,API_BASE_URL } from 'src/app/shared/api-config';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-customer-address',
  templateUrl: './add-customer-address.component.html',
  styleUrls: ['./add-customer-address.component.scss']
})
export class AddCustomerAddressComponent implements OnInit {

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
    sendBody:any;
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
   
    handleInput(inputName: string, inputValue: string): void {
      console.log(inputName,inputValue)
      this.sendBody = {
        ...this.sendBody,
        [inputName]:inputValue
      }
  console.log(this.sendBody);
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
        type: this.sendBody.type ,
        contactname: null,
        description : null,
        houseno:this.sendBody.houseno,
        building :this.sendBody.building,
        street:this.sendBody.street,
        locality:null,
        landmark:this.sendBody.landMark,
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
        isactive:1,
      fkempid:this.employeeId
      }
    
  
    this.http.post(`${API_BASE_URL}/v1/address/add`, requestbody).subscribe((data)=>{console.log(data,"added address")
  this.addressArray.push(data);
  });
  }
  
  
  
  
  }
  
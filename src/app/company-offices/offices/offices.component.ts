import { Component, OnInit,Input,EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormControl ,FormGroup,Validators} from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api_Base,API_BASE_URL } from 'src/app/shared/api-config';
@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.scss']
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


  constructor(  private http: HttpClient) {}


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
   console.log(this.offices)
  }

  updateOffice(){
    const requestBody = {
     id:this.offices.id,
     code:this.offices.code,
     name:this.offices.name,
     type:this.offices.type,
     fkorgid:this.offices.fkorgid

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
    fkcountrycode:'IN',
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

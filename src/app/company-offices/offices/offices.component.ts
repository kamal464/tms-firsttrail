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
  }


  
}

import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api_Base,API_BASE_URL } from '../shared/api-config';
@Component({
  selector: 'app-company-departments',
  templateUrl: './company-departments.component.html',
  styleUrls: ['./company-departments.component.scss']
})
export class CompanyDepartmentsComponent implements OnInit {
departments : any;
departmentTypeArray : any;
departmentName :any;
departmentType : any;
selectedOffice : any;
headOfDepartment : any;
officeType:any;
sendBody:any;
_currentAction = 'view';
isNew = false;
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.getDepartments();
    this.getDepartmentType();
    this.getOfficeType();
  }

  handleInput(inputName: string, inputValue: string): void {
    console.log(inputName,inputValue)
    this.sendBody = {
      ...this.sendBody,
      [inputName]:inputValue
    }
console.log(this.sendBody);
  }


getDepartments(){
  this.http.post(`${API_BASE_URL}/t/department/getall`,{}).subscribe((data) => {
    console.log(data)
    this.departments = data;
  })
}

getDepartmentType(){
  const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('filtername', 'fkreasonid')
  .set('filtervalue', '1689749905408');

this.http.post(`${API_BASE_URL}/t/reasonitem/getall`, {}, { headers })
  .subscribe(
    (data)=> {
      this.departmentTypeArray = data;
      console.log(data)
    
    }
  )
}

getOfficeType(){
  this.http.post(`${API_BASE_URL}/t/office/getall` , {}).subscribe((data)=>{
    console.log(data)
    this.officeType = data;
  })
}

addDepartment(){
  const timestamp = new Date().getTime(); 
  const requestBody = {
    id:timestamp,
    fkofficeid:this.sendBody.officeid,
    fkorgid:1,
    type:this.sendBody.type,
    name:this.sendBody.name,
    hodfkempid:null
  }
  this.http.post(`${API_BASE_URL}/t/department/add` , requestBody).subscribe((data)=> {
console.log(requestBody)
this.departments.push(data)
this.selectedOffice = '',
this.departmentType = '',
this.departmentName = ''
  })
}
_onDeleteOffice($event): void {
  console.log($event)
  this.deleteDepartment($event);
   
}


deleteDepartment(depid){
  console.log(depid)
  const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('id', depid.toString());
  this.http.post(`${API_BASE_URL}/t/department/delete`,{},{ headers }).subscribe((data)=>{
    console.log(data,"department is delete")
  
    this.departments = this.departments.filter((item) => item.id !== depid);
    console.log(this.departments)
  })
}



doAction(action): void {
this._currentAction = action;
  switch (action) {
    case 'delete':
      break;
    case 'edit':
      this._currentAction = action;
      break;
    case 'save':
      break;
    case 'cancel':
      break;
    default:
  }
}


}

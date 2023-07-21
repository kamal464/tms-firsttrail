import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { API_BASE_URL,Api_Base } from 'src/app/shared/api-config';
@Component({
  selector: 'app-company-departments-entry',
  templateUrl: './company-departments-entry.component.html',
  styleUrls: ['./company-departments-entry.component.scss']
})
export class CompanyDepartmentsEntryComponent implements OnInit {
  _currentAction = 'view';
  @Input() department : any = []
  @Input() departmentTypeArray :any = []
  @Input() officeType:any;
  @Output() onDelete = new EventEmitter<any>();
  _offices = [];
  departmentType : any;
  departmentName: any;
  selectedOffice : any;
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    console.log(this.department)
    console.log(this.departmentTypeArray)
    console.log(this.officeType)
    // console.log(this._offices)
  }
  getOfficeCode(fkofficeid: number): string {
    const office = this.officeType.find((office) => office.id === fkofficeid);
    return office ? office.code : '';
  }

  getOfficeType(fkofficeid:number): string {
    const office = this.officeType.find((office)=> office.id === fkofficeid );
    return office ? office.type : ''
  }
  _doDelete(): void {
    this.onDelete.emit(this.department.id);
  }

  updateDepartment(){
    const requestBody = {
      id:this.department.id,
      fkofficeid:this.selectedOffice.id ,
      fkorgid:this.department.fkorgid ,
      type: this.department.type,
      name:this.department.name,
      hodfkempid:null ,
    }
    console.log(requestBody)
    this.http.post(`${API_BASE_URL}/t/department/update` , requestBody).subscribe((data)=>{
console.log(data ,"Department is updated")
this.getOfficeCode(this.selectedOffice.id)
this.getOfficeType(this.selectedOffice.id)
this.department =data
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

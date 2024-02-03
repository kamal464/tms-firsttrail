import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { API_BASE_URL,Api_Base } from 'src/app/shared/api-config';
import { Query } from '@syncfusion/ej2-data';
// import { EmitType } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base/src/base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
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
  constructor(private http : HttpClient) {
    
   }

  ngOnInit(): void {
    console.log(this.department)
    console.log(this.departmentTypeArray)
    console.log(this.officeType)
    setTimeout(()=>{
      this.officeArray = this.officeArray.concat(this.officeType);
      this.departmentArray = this.departmentArray.concat(this.departmentTypeArray);
    },200)
   
    // console.log(this._offices)
  }


  handleInput(inputName: string, inputValue: string): void {
    console.log(inputName,inputValue)
    this.department[inputName] = inputValue;
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
      fkofficeid:this.department.officeid ,
      fkorgid:this.department.fkorgid ,
      type: this.department.type,
      name:this.department.name,
      hodfkempid:null ,
    }
    console.log(requestBody)
    this.http.post(`${API_BASE_URL}/v1/department/update` , requestBody).subscribe((data)=>{
console.log(data ,"Department is updated")
this.getOfficeCode(this.department.officeid)
this.getOfficeType(this.department.officeid)
this.department =data
    })
  }
  
  
  
  
  public departmentArray:any= [];
  public localFields: Object = { text: 'value', value: 'id' };
    // set the placeholder to DropDownList input element
      public localWaterMark: string = 'Select a type';
      // set the height of the popup element
      public localheight: string = '200px';
    

public officeArray:any =[];
public officeFields:Object =  { text: 'code', value: 'name' };
public OfficewaterMark:string = 'Select a type';
public officeHeight : string = '200px';








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

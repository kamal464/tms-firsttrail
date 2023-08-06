import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Component, OnInit,Output,Input,EventEmitter } from '@angular/core';
import { API_BASE_URL,Api_Base } from '../shared/api-config';


@Component({
  selector: 'app-employee-profile-entry',
  templateUrl: './employee-profile-entry.component.html',
  styleUrls: ['./employee-profile-entry.component.scss']
})
export class EmployeeProfileEntryComponent implements OnInit {
  _available_options : any=['Reset Password','Change Email','Change Phone Number','Confirm Employee','Change Supervisor','Change Office','New Promotion','Resign','Delete Employee']
  constructor(private http:HttpClient) { }
  CombinedEmployee : any;
  fetchEmpOfficial:any;
  fetchEmpPersonal:any;
  _selected_option = '';
  _currentAction = 'view';
  fetchedType:any = [];
  fetchedDesignation :any = [];
  fetchedGrade :any = [];
  empSupervisor : any;
  empManager : any;
  empDesignation:any;
  empGrade:any;
  empType:any;
  empEffectiveDate:any;
  empMonthlyCtc:any;
  empRemarks:any;
  empDateOfBirth:any;
  empDateOfMarriage:any;
  empEmail:any;
  empMobile:any;
  empLinkedIn:any;
  empTwitter:any;
  empInstagram:any;
  empFacebook:any;
  empWebsite:any;
  @Output() onAction = new EventEmitter<any>();
  ngOnInit(): void {
    this.getDesignation();
    this.getEmpOfficial();
    this.getEmpPersonal();
    this.getGrade();
    this.getType();
  }



  doAction(action): void {
    this._currentAction = action;
    console.log(action)
      switch (action) {
        case 'delete':
          break;
        case 'edit':
          this._currentAction = action;
          break;
        case 'save':
          this._currentAction = 'view';
          this.addEmpOfficial();
          this.onAction.emit(action);
          break;
        case 'cancel':
          this._currentAction = 'view';
          this.onAction.emit(action);
          break;
          case 'new':
            this.onAction.emit(action);
            this._currentAction = 'new'
            break;
        default:
      }
    }


addEmpOfficial(){
  const timestamp = new Date().getTime(); 
  let dateNumbers = null;
  if (this.empEffectiveDate) {
    const dateObj = new Date(this.empEffectiveDate);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // Months are zero-based, so we add 1
    const day = dateObj.getDate();
    dateNumbers = `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;
  }
  const requestBody = {
    id: timestamp,
    fkorgid:1,
    supervisorfkempid:null,
    managerfkempid:null,
    designation:this.empDesignation,
    fkofficeid:null,
    fkdepartmentid:null,
    grade:this.empGrade,
    type:this.empType,
    effectivedate:this.empEffectiveDate? dateNumbers : null,
    monthlyctc:this.empMonthlyCtc,
    remarks:this.empRemarks,
    approvalstatus:null,
    previousfkempofficialid:null,
  }
  this.http.post(`${API_BASE_URL}/t/empofficial/add`,requestBody).subscribe((data)=>{
    console.log(data);
  })
this.addEmpPersonal();
}

addEmpPersonal(){
  const timestamp = new Date().getTime(); 
  let dob = null;
  let dom = null;
  if (this.empDateOfBirth) {
    const dateObj = new Date(this.empDateOfBirth);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // Months are zero-based, so we add 1
    const day = dateObj.getDate();
    dob = `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;
  }

  if (this.empDateOfMarriage) {
    const dateObj = new Date(this.empDateOfMarriage);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // Months are zero-based, so we add 1
    const day = dateObj.getDate();
    dom = `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;
  }
  const requestBody = {
    id: timestamp,
    fkempid:  null,
    dateofbirth:dob,
    dateofmarriage:dom,
    email:this.empEmail,
    mobile:this.empMobile,
    linkedin:this.empLinkedIn,
    twitter:this.empTwitter,
    instagram:this.empInstagram,
    facebook:this.empFacebook,
    website:this.empWebsite
  }

this.http.post(`${API_BASE_URL}/t/emppersonal/add`,requestBody).subscribe((data)=>{
  console.log(data);
})

}



getEmpOfficial(){
  this.http.post(`${API_BASE_URL}/t/empofficial/getall`,{}).subscribe((data)=>{
    this.fetchEmpOfficial = data;
    console.log('empOfficial',this.fetchEmpOfficial);
  })
}
getEmpPersonal(){
  this.http.post(`${API_BASE_URL}/t/emppersonal/getall`,{}).subscribe((data)=>{
  this.fetchEmpPersonal = data;
    console.log('empPersonal',this.fetchEmpPersonal);
  })
}

    getType(){
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('reason', 'EmployeeType');
      this.http.post(`${Api_Base}/utils/dropdown/reason`,{},{headers}).subscribe((data:any) => {
this.fetchedType = data;
console.log(this.fetchedType)
      })
    }


    getDesignation(){
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('reason', 'EmpDesignation');
      this.http.post(`${Api_Base}/utils/dropdown/reason`,{},{headers}).subscribe((data) => {
        this.fetchedDesignation = data;
        console.log(this.fetchedDesignation)
              })
    }

    getGrade(){
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('reason', 'EmpGrade');
      this.http.post(`${Api_Base}/utils/dropdown/reason`,{},{headers}).subscribe((data) => {
        this.fetchedGrade = data;
        console.log(this.fetchedGrade)
              })
    }






}

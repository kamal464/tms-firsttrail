import { Component, OnInit,Input,Output,EventEmitter, OnChanges, SimpleChanges ,OnDestroy } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api_Base,API_BASE_URL } from 'src/app/shared/api-config';

import { SharedServiceService } from 'src/app/shared/shared-service.service';


@Component({
  selector: 'app-employee-profile-emp',
  templateUrl: './employee-profile-emp.component.html',
  styleUrls: ['./employee-profile-emp.component.scss']
})
export class EmployeeProfileEmpComponent implements OnInit,OnChanges {
  

  @Input() _currentAction = 'view';
  
  CombinedEmployee : any;
  fetchEmpOfficial:any;
  fetchEmpPersonal:any;
  _selected_option = '';
  fetchedCountries:any=[];
  fetchedGender:any = [];
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
  empTitle:any;
  empSurname:any;
  empGivename:any;
  empCode:any;
  empDisplayname:any;
  empNo:any;
  empGender:any;
  empFkcountrycode:any;
  empOfficialemail:any;
  empPersonalemail:any;
  empMobileone:any;
 empMobiletwo:any;
 empStatus:any;
 empJoiningdate:any;
 empConfirmationdate:any;
 empResignationdate:any;
 empExitdate:any;
 empLatestfkempofficialid:any;




  @Output() onAction = new EventEmitter<any>();


  constructor(private http : HttpClient){}
  ngOnInit(): void {
    this.getDesignation();
    this.getEmpOfficial();
    this.getEmpPersonal();
    this.getGrade();
    this.getGenders();
    this.getCountries();
    this.getType();
  }
ngOnChanges(changes: SimpleChanges): void {
    console.log(this._currentAction)
  //  this.doAction(this._currentAction); 
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
          // this._currentAction = 'view';
          this.addEmp();
          // this.addEmpOfficial();
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

addEmp(){
  const timestamp = new Date().getTime();
  let dateNumbers = null;
  if(this.empJoiningdate) {
    const dateobj = new Date(this.empJoiningdate);
    const year = dateobj.getFullYear();
    const month = dateobj.getMonth() + 1;
    const day = dateobj.getDate();
    dateNumbers = `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;
  }
  const requestBody = {
    id:timestamp,
    fkorgid:1,
    title:this.empTitle?this.empTitle : null,
    surname:this.empSurname,
    givenname:this.empGivename,
    empcode:this.empCode,
    displayname:this.empDisplayname,
    empno:this.empNo,
    gender:this.empGender,
    fkcountrycode:this.empFkcountrycode,
    officialemail:this.empOfficialemail,
    personalemail:this.empPersonalemail,
    mobile1:this.empMobileone,
    mobile2:this.empMobiletwo,
    status:0,
    joiningdate:dateNumbers,
    confirmationdate:this.empConfirmationdate,
    resignationdate:this.empResignationdate,
    exitdate:this.empExitdate,
    latestfkempofficialid:this.empLatestfkempofficialid

  }
  
  
  this.http.post(`${API_BASE_URL}/t/emp/add`,requestBody).subscribe((data)=>{
    console.log(data);
  })
  this.addEmpOfficial(requestBody.id)



}




addEmpOfficial(empid){
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
    fkempid:empid,
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
    approvalstatus:0,
    previousfkempofficialid:null,
  }
  this.http.post(`${API_BASE_URL}/t/empofficial/add`,requestBody).subscribe((data)=>{
    console.log(data);
  })
this.addEmpPersonal(requestBody.fkempid);
}

addEmpPersonal(empid){
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
    fkempid:  empid,
    dateofbirth:dob,
    dateofmarriage:dom,
    email:this.empPersonalemail,
    mobile:this.empMobileone,
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

    getGenders(){
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('reason', 'EmpGender');
      this.http.post(`${Api_Base}/utils/dropdown/reason`,{},{headers}).subscribe((data) => {
        this.fetchedGender = data;
        console.log(this.fetchedGender)
              })
    }

    getCountries(){
      this.http.post(`${Api_Base}/utils/dropdown/country`,{}).subscribe((data =>{ console.log(data)
  this.fetchedCountries = data;
    
    }))
  }




}

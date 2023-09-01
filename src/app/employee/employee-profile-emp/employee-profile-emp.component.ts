import { Component, OnInit,Input,Output,EventEmitter, OnChanges, SimpleChanges ,OnDestroy } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api_Base,API_BASE_URL } from 'src/app/shared/api-config';
import { Subscription } from 'rxjs';
import { SharedServiceService } from 'src/app/shared/shared-service.service';


@Component({
  selector: 'app-employee-profile-emp',
  templateUrl: './employee-profile-emp.component.html',
  styleUrls: ['./employee-profile-emp.component.scss']
})
export class EmployeeProfileEmpComponent implements OnInit,OnChanges {
  private subscription: Subscription;

  @Input() _currentAction = 'view';
  
  
  fetchEmpOfficial:any;
  fetchEmpPersonal:any;
  _selected_option = '';
  fetchedCountries:any=[];
  fetchedTitle:any=[];
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
empOffice:any;
empDepartment:any;
 officesDropdown :any;
 departmentsDropdown : any;
 selectedOfficeId : any;
updateGender:any;

  @Output() onAction = new EventEmitter<any>();


  constructor(private http : HttpClient,private sharedService : SharedServiceService){}
  ngOnInit(): void {
   
    

    this.getDesignation();
    this.getEmpOfficial();
    this.getEmpPersonal();
    this.getGrade();
    this.getGenders();
    this.getCountries();
    this.getType();
   this.getTitle();
    this.getOffices();
    this.getEmployee();
  }
ngOnChanges(changes: SimpleChanges): void {
    console.log(this._currentAction)
   this.doAction(this._currentAction); 
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
  const formatDateField = (dateValue) => {
    if (!dateValue) {
      return null;
    }
    
    const dateObj = new Date(dateValue);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    
    return `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;
  };
  const requestBody = {
    id:timestamp,
    fkorgid:1,
    title:this.empTitle?this.empTitle : null,
    surname:this.empSurname,
    givenname:this.empGivename,
    empcode:this.empCode,
    displayname:this.empDisplayname,
    empno:this.empNo,
    // gender:this.empGender,
    // fkcountrycode:this.empFkcountrycode,
    // officialemail:this.empOfficialemail,
    // personalemail:this.empPersonalemail,
    // mobile1:this.empMobileone,
    // mobile2:this.empMobiletwo,
    status:0,
    joiningdate:formatDateField(this.empJoiningdate),
    confirmationdate: formatDateField(this.empConfirmationdate),
    resignationdate: formatDateField(this.empResignationdate),
    exitdate:formatDateField(this.empExitdate),
    latestfkempofficialid:this.empLatestfkempofficialid

  }
  
  console.log(requestBody,'emp body')
  this.http.post(`${API_BASE_URL}/t/emp/add`,requestBody).subscribe((data)=>{
    console.log(data);
  })
  this.addEmpOfficial(requestBody.id)



}




addEmpOfficial(empid){
  const timestamp = new Date().getTime(); 
  const formatDateField = (dateValue) => {
    if (!dateValue) {
      return null;
    }
    
    const dateObj = new Date(dateValue);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    
    return `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;
  };
  const requestBody = {
    id: timestamp,
    fkempid:empid,
    supervisorfkempid:null,
    managerfkempid:null,
    designation:this.empDesignation,
    fkofficeid:this.empOffice,
    fkdepartmentid:null,
    grade:this.empGrade,
    type:this.empType,
    effectivedate:formatDateField(this.empEffectiveDate),
    // monthlyctc:this.empMonthlyCtc,
    remarks:this.empRemarks,
    approvalstatus:0,
    previousfkempofficialid:null,
  }
  console.log(requestBody,'empofficial body')
  this.http.post(`${API_BASE_URL}/t/empofficial/add`,requestBody).subscribe((data)=>{
    console.log(data);
  })
this.addEmpPersonal(requestBody.fkempid);
}

addEmpPersonal(empid){
  const timestamp = new Date().getTime(); 
  const formatDateField = (dateValue) => {
    if (!dateValue) {
      return null;
    }
    
    const dateObj = new Date(dateValue);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    
    return `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;
  };
  const requestBody = {
    id: timestamp,
    fkempid:  empid,
    dateofbirth:formatDateField(this.empDateOfBirth),
    dateofmarriage:formatDateField(this.empDateOfMarriage),
    personalemail:this.empPersonalemail,
    personalmobile:this.empMobileone,
    linkedin:this.empLinkedIn,
    twitter:this.empTwitter,
    instagram:this.empInstagram,
    facebook:this.empFacebook,
    website:this.empWebsite
  }


  console.log(requestBody,"emppersonalbody")
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

  getTitle(){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('reason','EmpTitle');
    this.http.post(`${Api_Base}/utils/dropdown/reason`,{},{headers}).subscribe((data)=>{
      this.fetchedTitle = data;
      console.log(this.fetchedTitle)
    })
  }






    getCountries(){
      this.http.post(`${Api_Base}/utils/dropdown/country`,{}).subscribe((data =>{ console.log(data)
  this.fetchedCountries = data;
    
    }))
  }

  getOffices(){
    const headers = new HttpHeaders()

    .set('Content-Type', 'application/json')
    .set('fkorgid', '1');
    this.http.post(`${Api_Base}/utils/dropdown/office`,{},{headers}).subscribe((data) => {
      this.officesDropdown = data;
      console.log(this.officesDropdown)
            })
  }


  onOfficeSelect(event: any): void {
    this.selectedOfficeId = event.value; 
    this.getDepartments()
   
  }

getDepartments(){
  console.log(this.selectedOfficeId);
  const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
    .set('fkofficeid', [this.selectedOfficeId]);
    this.http.post(`${Api_Base}/utils/dropdown/department`,{},{headers}).subscribe((data) => {
    this.departmentsDropdown = data;
      console.log(data)
            })
}


getEmployee(){
  const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
    .set('fkorgid', '1');
    this.http.post(`${Api_Base}/utils/dropdown/employee`,{},{headers}).subscribe((data) => {
     
      console.log(data)
            }) 
}





  }






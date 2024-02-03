import { Component,ChangeDetectorRef, OnInit,Input,Output,EventEmitter, OnChanges, SimpleChanges ,OnDestroy } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api_Base,API_BASE_URL } from 'src/app/shared/api-config';
import { Subscription } from 'rxjs';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
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
sendBody:any;
isDataLoaded = false;
  @Output() onAction = new EventEmitter<any>();


  constructor(private http : HttpClient,private sharedService : SharedServiceService, private cd: ChangeDetectorRef){
  //   this.getDesignation();
  //   this.getEmpOfficial();
  //   this.getEmpPersonal();
  //   this.getGrade();
  //   this.getGenders();
  //   this.getCountries();
  //   this.getType();
  //  this.getTitle();
  //   this.getOffices();
  //   this.getEmployee();
  }
  ngOnInit(): void {
   this.loadData()
    

   
  }
ngOnChanges(changes: SimpleChanges): void {
    console.log(this._currentAction)
   this.doAction(this._currentAction); 
}

handleInput(inputName: string, inputValue: string): void {
  console.log(inputName,inputValue)
  this.sendBody = {
    ...this.sendBody,
    [inputName]:inputValue
  }
console.log(this.sendBody);
if ('fkofficeid' in this.sendBody) {
  this.getDepartments(this.sendBody.fkofficeid)
}

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
    title:this.sendBody.title,
    surname:this.sendBody.surname,
    givenname:this.sendBody.givenname,
    empcode:this.sendBody.empcode,
    displayname:this.sendBody.displayname,
    empno:this.sendBody.empno,
    // gender:this.empGender,
    // fkcountrycode:this.empFkcountrycode,
    // officialemail:this.empOfficialemail,
    // personalemail:this.empPersonalemail,
    // mobile1:this.empMobileone,
    // mobile2:this.empMobiletwo,
    status:0,
    joiningdate:formatDateField(this.sendBody.joiningdate),
    confirmationdate: formatDateField(this.sendBody.confirmationdate),
    resignationdate: formatDateField(this.sendBody.resignationdate),
    exitdate:formatDateField(this.sendBody.exitdate),
    latestfkempofficialid:this.empLatestfkempofficialid

  }
  
  console.log(requestBody,'emp body')
  this.http.post(`${API_BASE_URL}/v1/emp/add`,requestBody).subscribe((data)=>{
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
    supervisorfkempid:this.sendBody.supervisorfkempid,
    managerfkempid:this.sendBody.managerfkempid,
    designation:this.sendBody.designation,
    fkofficeid:this.sendBody.fkofficeid,
    fkdepartmentid:null,
    grade:this.sendBody.grade,
    type:this.sendBody.type,
    effectivedate:formatDateField(this.sendBody.effectivedate),
    // monthlyctc:this.empMonthlyCtc,
    remarks:this.sendBody.remarks,
    approvalstatus:0,
    previousfkempofficialid:null,
  }
  console.log(requestBody,'empofficial body')
  this.http.post(`${API_BASE_URL}/v1/empofficial/add`,requestBody).subscribe((data)=>{
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
    dateofbirth:formatDateField(this.sendBody.dateofbirth),
    dateofmarriage:formatDateField(this.sendBody.dateofmarriage),
    personalemail:this.sendBody.personalemail,
    personalmobile:this.sendBody.personalmobile,
    linkedin:this.sendBody.linkedin,
    twitter:this.sendBody.twitter,
    instagram:this.sendBody.instagram,
    facebook:this.sendBody.facebook,
    website:this.sendBody.website
  }


  console.log(requestBody,"emppersonalbody")
this.http.post(`${API_BASE_URL}/v1/emppersonal/add`,requestBody).subscribe((data)=>{
  console.log(data);
})

}


loadData() {
  // Define your API calls using forkJoin
  const grade = this.http.post(`${Api_Base}/utils/dropdown/reason`, {}, {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('reason', 'EmpGrade')
  });

  const gender = this.http.post(`${Api_Base}/utils/dropdown/reason`, {}, {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('reason', 'EmpGender')
  });

  const title = this.http.post(`${Api_Base}/utils/dropdown/reason`, {}, {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('reason', 'EmpTitle')
  });

  const countries = this.http.post(`${Api_Base}/utils/dropdown/country`, {});

  const type = this.http.post(`${Api_Base}/utils/dropdown/reason`, {}, {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('reason', 'EmployeeType')
  });

  const empOfficial = this.http.post(`${API_BASE_URL}/v1/empofficial/getall`, {});
  const empPersonal = this.http.post(`${API_BASE_URL}/v1/emppersonal/getall`, {});

  const designation = this.http.post(`${Api_Base}/utils/dropdown/reason`, {}, {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('reason', 'EmpDesignation')
  });

  // Additional API calls can be included here

  forkJoin([
    grade,
    gender,
    title,
    countries,
    type,
    empOfficial,
    empPersonal,
    designation, // Include the getDesignation() API call here
    // Add more API calls as needed
  ]).subscribe(
    ([
      dataGrade,
      dataGender,
      dataTitle,
      dataCountries,
      dataType,
      dataEmpOfficial,
      dataEmpPersonal,
      dataDesignation, // Include additional data variables here
    ]) => {
      // Assign data to your variables
      this.fetchedGrade = dataGrade;
      this.fetchedGender = dataGender;
      this.fetchedTitle = dataTitle;
      this.fetchedCountries = dataCountries;
      this.fetchedType = dataType;
      this.fetchEmpOfficial = dataEmpOfficial;
      this.fetchEmpPersonal = dataEmpPersonal;
      this.fetchedDesignation = dataDesignation;
       // Assign data for designation
      // Assign data to other variables as needed
      this.getOffices();

      // Set the flag when all data is loaded
      this.isDataLoaded = true;

      // Log data from each API call
      console.log('Grade Data:', this.fetchedGrade);
      console.log('Gender Data:', this.fetchedGender);
      console.log('Title Data:', this.fetchedTitle);
      console.log('Countries Data:', this.fetchedCountries);
      console.log('Type Data:', this.fetchedType);
      console.log('EmpOfficial Data:', this.fetchEmpOfficial);
      console.log('EmpPersonal Data:', this.fetchEmpPersonal);
      console.log('Designation Data:', this.fetchedDesignation);
      // Add more log statements for additional data if needed
    },
    error => {
      console.error('Error loading data:', error);
    }
  );
}

getEmpOfficial(){
  this.http.post(`${API_BASE_URL}/v1/empofficial/getall`,{}).subscribe((data)=>{
    this.fetchEmpOfficial = data;
    console.log('empOfficial',this.fetchEmpOfficial);
  })
}
getEmpPersonal(){
  this.http.post(`${API_BASE_URL}/v1/emppersonal/getall`,{}).subscribe((data)=>{
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
this.isDataLoaded = true; 
console.log(this.fetchedType)
      })
    }

 getDesignation(){
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('reason', 'EmpDesignation');
      this.http.post(`${Api_Base}/utils/dropdown/reason`,{},{headers}).subscribe((data) => {
        this.fetchedDesignation = data;
        this.isDataLoaded = true; 
        console.log(this.fetchedDesignation)
              })
    }

 getGrade(){
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('reason', 'EmpGrade');
      this.http.post(`${Api_Base}/utils/dropdown/reason`,{},{headers}).subscribe((data) => {
        this.fetchedGrade = data;
        this.isDataLoaded = true; 
        console.log(this.fetchedGrade)
              })
    }
   
 getGenders(){
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('reason', 'EmpGender');
      this.http.post(`${Api_Base}/utils/dropdown/reason`,{},{headers}).subscribe((data) => {
        this.fetchedGender = data;
        this.isDataLoaded = true; 
        console.log(this.fetchedGender)
              })
    }

  getTitle(){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('reason','EmpTitle');
    this.http.post(`${Api_Base}/utils/dropdown/reason`,{},{headers}).subscribe((data)=>{
      this.fetchedTitle = data;
      this.isDataLoaded = true; 
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
      this.isDataLoaded = true; 
      console.log(this.officesDropdown)
            })
           
  }


  onOfficeSelect(event: any): void {
    this.selectedOfficeId = event.value; 
    // this.getDepartments()
   
  }

getDepartments(id){
  // console.log(this.selectedOfficeId);
  const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
    .set('fkofficeid', [id]);
    this.http.post(`${Api_Base}/utils/dropdown/department`,{},{headers}).subscribe((data) => {
      if (!this.departmentsDropdown) {
        this.departmentsDropdown = []; // Initialize departmentsDropdown as an empty array if it's undefined
        
        this.departmentsDropdown = data;
      }
    
      this.isDataLoaded = true; 
    this.cd.detectChanges();
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






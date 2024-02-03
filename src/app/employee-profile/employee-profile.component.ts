import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_BASE_URL } from '../shared/api-config';
import { SharedServiceService } from '../shared/shared-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {
  _available_options : any=['PROFILE','ADDRESS','CONTACTS','DEPANDANTS','WORK EXPERIENCE','IDENTITIES','EDUCATION','HISTORY'];
  private subscription: Subscription;
  _selected_option = 'PROFILE';
  employeeId:number;
  employeeDetails:any;
  _currentAction = 'view';
  mergedArray :any  [];
  employeeArray:any = [];
  employeeOfficalArray  :any = [];
  employeePersonalArray : any = [];




  constructor(private http : HttpClient,private sharedService:SharedServiceService) { }
  ngOnInit(): void {

    this.subscription = this.sharedService.employeeId$.subscribe((empid) => {
      this.employeeId = empid;
      if (this.employeeId) {
        console.log('Employee ID in Component B:', this.employeeId);
        // You can perform further actions with the employee ID here
      } else {
        console.log('Employee ID not set in Component B');
      }
    });
  





    this.FetchEmployee();
    this.FetchEmployeeOfficial();
    this.FetchEmployeePersonal();

    setTimeout(() => {
      this.combineData();
    }, 200);
    


  }


  selectOption(option) {
    this._selected_option = option;
    console.log(option,this._selected_option)
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
          break;
        case 'cancel':
          this._currentAction = 'view';
          break;
        default:
      }
    }


FetchEmployee(){
  this.http.post(`${API_BASE_URL}/v1/emp/getall` , {}).subscribe((data)=>{
    console.log(data,'employees')
    this.employeeArray = data;
   

  })
}

FetchEmployeeOfficial(){
  this.http.post(`${API_BASE_URL}/v1/empofficial/getall` , {}).subscribe((data)=>{
    console.log(data,'officials')
    this.employeeOfficalArray = data;
   
  })
}
FetchEmployeePersonal(){
  this.http.post(`${API_BASE_URL}/v1/emppersonal/getall` , {}).subscribe((data)=>{
    console.log(data,'Personals')
    this.employeePersonalArray = data;
  })

}



combineData() {
  if (this.employeeArray && this.employeeOfficalArray && this.employeePersonalArray) {
    const combinedArray = [];

    this.employeeArray.forEach((employee) => {
      
      const officialData = this.employeeOfficalArray.find((official) => official.fkempid === employee.id);
      const personalData = this.employeePersonalArray.find((personal) => personal.fkempid === employee.id);

      console.log('Employee:', employee);
      console.log('Official Data:', officialData);
      console.log('Personal Data:', personalData);

      const combinedEmployee = {
        ...employee,
        officialData: officialData,
        personalData: personalData
      };
      combinedArray.push(combinedEmployee);
    });
  
    console.log('Combined Array:', combinedArray);
    this.mergedArray = combinedArray;
    console.log('MergedArray',this.mergedArray);
  }
    this.findEmployee(this.employeeId)
}

findEmployee(empid){
  const idToFind = empid;
 
  const foundElement = this.mergedArray.find((item) => item.id === empid);
  if (foundElement) {
    console.log('Found Element:', foundElement);

    this.employeeDetails = foundElement;
    console.log(this.employeeDetails)
    
  } else {
    console.log('Element with ID', idToFind, 'not found in mergedArray');
  }
}





}

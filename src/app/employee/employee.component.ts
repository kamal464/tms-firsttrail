import { Component, DoCheck, Input, OnDestroy, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared/shared-service.service';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../shared/api-config';
import { computeMsgId } from '@angular/compiler';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
_currentAction = 'view';
@Input() empData :any = [];


constructor(private sharedservice: SharedServiceService, private http: HttpClient) {
  
}

  ngOnInit(): void {
    this.getEmployees();
  }
 


  triggerDoAction(): void {
    this.sharedservice.addNavItem('addemployee');
    
    //this.callDoActionInComponentA();
  }
  doAction(action){
this._currentAction = action;
    
  }

sendEmployeeId(id){
  this.sharedservice.setEmployeeid(id)
  this.sharedservice.addNavItem('employee-profile');
}


  getEmployees(){
    this.http.post(`${API_BASE_URL}/t/emp/getall`,{}).subscribe((data)=>{
      console.log(data,"employees data fetched");
      this.empData = data;
    })
  }


}

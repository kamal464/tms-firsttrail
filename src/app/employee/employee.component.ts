import { Component, DoCheck, Input, OnDestroy, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared/shared-service.service';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../shared/api-config';
import { computeMsgId } from '@angular/compiler';
import { Subscription } from 'rxjs';
import { TabeventserviceService } from '../shared/tabeventservice.service';
import { TabbedItem } from '../shared/components/dynamic-tab/dynamic-tab.component';
import { DynamicComponent } from '../shared/components/dynamic-tab/dynamic-component-loader.directive';
import { EmployeeProfileEmpComponent } from './employee-profile-emp/employee-profile-emp.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeProfileComponent } from '../employee-profile/employee-profile.component';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
_currentAction = 'view';
currentEmployee : '';
@Input() empData :any = [];


constructor(private sharedservice: SharedServiceService, private http: HttpClient,
  private tabeventservice:TabeventserviceService) {
  
}

  ngOnInit(): void {
    this.getEmployees();
  }
 


  triggerDoAction(): void {
    this.sharedservice.addNavItem('addemployee');
    const tabItem: TabbedItem = {
      id: 'Newemployeee',
      icon: '',
      label: 'NewEmployee',
      isClosable: true,
      item: new DynamicComponent(EmployeeAddComponent, {
        currentEmployee: this.currentEmployee,
        tabEvent: this.tabeventservice.tabEventSubject,
      }),
    };

    this.tabeventservice.openOrAddTab(tabItem)

    
  }
  doAction(action){
this._currentAction = action;
    
  }

sendEmployeeId(id){
  this.sharedservice.setEmployeeid(id)
  // this.sharedservice.addNavItem('employee-profile');
  this.sharedservice.addNavItem('addemployee');
    const tabItem: TabbedItem = {
      id: 'employeeprofile',
      icon: '',
      label: 'Employee-Profile',
      isClosable: true,
      item: new DynamicComponent(EmployeeProfileComponent, {
        currentEmployee: this.currentEmployee,
        tabEvent: this.tabeventservice.tabEventSubject,
      }),
    };
    this.tabeventservice.openOrAddTab(tabItem)
}


  getEmployees(){
    this.http.post(`${API_BASE_URL}/t/emp/getall`,{}).subscribe((data)=>{
      console.log(data,"employees data fetched");
      this.empData = data;
    })
  }


}

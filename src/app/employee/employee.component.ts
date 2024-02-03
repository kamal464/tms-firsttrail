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
filterData:any=[];
sortOptions: any = [];
projectData:any=[{id:"construction",value:"construction"}];
locationData:any=[{id:"cements-vizag",value:"cements-vizag"}  ];
@Input() empData :any = [];


constructor(private sharedservice: SharedServiceService, private http: HttpClient,
  private tabeventservice:TabeventserviceService) {
  
}
sortBy(sortField) {
  // Implement your logic for A-Z sorting based on the selected field
  console.log(`A-Z button clicked for ${sortField}`);
  // Update sortBy or perform other actions based on the selected field
  this.sortOptions.push(sortField);
}
clearFilterData() {
  this.filterData = []; // Set filterData to an empty array when the button is clicked
}
handleInput(inputName: string, inputValue: string): void {
  console.log(inputName,inputValue)
  this.filterData[inputName] = inputValue;
}
  ngOnInit(): void {
    this.getEmployees();
  }
 
 // Inside your component
isDropdownOpen = false;
isFilterOpen = false;
isSortOpen = false;

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;

  if (this.isDropdownOpen) {
    this.isFilterOpen = false; // Close the filter when opening the dropdown
  }
}

toggleFilterOptions() {
  this.isFilterOpen = !this.isFilterOpen;

  if (this.isFilterOpen) {
    this.isSortOpen = false; // Close the sort when opening the filter
  }
}

toggleSortOptions() {
  this.isSortOpen = !this.isSortOpen;

  if (this.isSortOpen) {
    this.isFilterOpen = false; // Close the filter when opening the sort
  }
}

cancelFilter() {
  this.isFilterOpen = false;
}

saveFilter() {
  this.isFilterOpen = false;
}

cancelSort() {
  this.isSortOpen = false;
}

saveSort() {
  this.isSortOpen = false;
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
    this.http.post(`${API_BASE_URL}/v1/emp/getall`,{}).subscribe((data)=>{
      console.log(data,"employees data fetched");
      this.empData = data;
    })
  }


}

import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { API_BASE_URL } from 'src/app/shared/api-config';
import { computeMsgId } from '@angular/compiler';
import { Subscription } from 'rxjs';
import { TabeventserviceService } from 'src/app/shared/tabeventservice.service';
import { TabbedItem } from 'src/app/shared/components/dynamic-tab/dynamic-tab.component';
import { DynamicComponent } from 'src/app/shared/components/dynamic-tab/dynamic-component-loader.directive';
import { EmployeeProfileEmpComponent } from 'src/app/employee/employee-profile-emp/employee-profile-emp.component';
import { EmployeeAddComponent } from 'src/app/employee/employee-add/employee-add.component';
import { EmployeeProfileComponent } from 'src/app/employee-profile/employee-profile.component';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
@Component({
  selector: 'app-find-customer',
  templateUrl: './find-customer.component.html',
  styleUrls: ['./find-customer.component.scss']
})
export class FindCustomerComponent implements OnInit {
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
      this.sharedservice.addNavItem('addcustomer');
      const tabItem: TabbedItem = {
        id: 'NewCustomer',
        icon: '',
        label: 'NewCustomer',
        isClosable: true,
        item: new DynamicComponent(AddCustomerComponent, {
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
  
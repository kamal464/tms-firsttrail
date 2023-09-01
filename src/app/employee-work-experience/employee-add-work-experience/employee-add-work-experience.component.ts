
import { Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { API_BASE_URL } from 'src/app/shared/api-config';
import { data } from '@syncfusion/ej2';
@Component({
  selector: 'app-employee-add-work-experience',
  templateUrl: './employee-add-work-experience.component.html',
  styleUrls: ['./employee-add-work-experience.component.scss']
})
export class EmployeeAddWorkExperienceComponent implements OnInit {
  @Input() _currentAction = 'new';
  @Input() workExperience :any =[];
  @Output() onAction = new EventEmitter<any>();
  isSaveFormDataCalled = false;
  employeeId :any;
  empEmployer:any;
  empDesignation:any;
  empRoles:any;
  empFromDate:any;
  empToDate:any;
  empRemarks:any;


  private subscription: Subscription;
  constructor(private http : HttpClient, private sharedService :SharedServiceService) { }

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
          if (!this.isSaveFormDataCalled){
            this.isSaveFormDataCalled = true;
        this.addWorkExperience();
          this._currentAction = 'view';
          this.onAction.emit(action);
          }
          break;
        case 'cancel':
          this._currentAction = 'view';
          this.onAction.emit(action);
          break;
        default:
      }
    }


addWorkExperience(){
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
  const requestBody ={
    id:timestamp,
    fkempid:this.employeeId,
    employer:this.empEmployer,
    designation:this.empDesignation,
    roles:this.empRoles,
    fromdate:formatDateField(this.empFromDate),
    todate:formatDateField(this.empToDate),
    isrelevant:null,
    reviewedbyfkempid:null,
    reviewdate:null,
    remarks:this.empRemarks,
    isactive:0
  }

this.http.post(`${API_BASE_URL}/t/empworkhistory/add`,requestBody).subscribe((data)=>{
  this.workExperience = data;
})

}








}

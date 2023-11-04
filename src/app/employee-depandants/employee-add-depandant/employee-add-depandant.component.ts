import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs';
import { API_BASE_URL } from 'src/app/shared/api-config';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
@Component({
  selector: 'app-employee-add-depandant',
  templateUrl: './employee-add-depandant.component.html',
  styleUrls: ['./employee-add-depandant.component.scss']
})
export class EmployeeAddDepandantComponent implements OnInit {
@Input() dependantsArray :any =[];
@Input() _currentAction = 'new';
@Input() relationArray : any =[];
@Input() genderArray : any = [];
@Output() onAction = new EventEmitter<any>();
employeeId :any;
empDependentName : string;
isSaveFormDataCalled = false;
empGender:any;
empDob  :any;
empRelation:any;
dependantData:any=[];
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
  handleInput(inputName: string, inputValue: string): void {
    console.log(inputName,inputValue)
    this.dependantData[inputName] = inputValue;
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
          this.addDependant();
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

    addDependant(){
      let dob = null;
      if (this.dependantData.birthdate) {
        const dateObj = new Date(this.dependantData.birthdate);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1; // Months are zero-based, so we add 1
        const day = dateObj.getDate();
        dob = `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;
      }
      const timestamp = new Date().getTime();
      const requestBody ={
        id:timestamp,
        fkempid:this.employeeId,
        dependentname:this.dependantData.dependentname,
        gender:this.dependantData.gender,
        birthdate:dob,
        relationtype:this.dependantData.relationtype,
        remarks:null,
      }

this.http.post(`${API_BASE_URL}/t/empdependent/add`,requestBody).subscribe((data)=>{
  this.dependantsArray.push(data);
})


    }






}

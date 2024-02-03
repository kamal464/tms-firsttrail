import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Api_Base,API_BASE_URL } from 'src/app/shared/api-config';
import { Subscription } from 'rxjs';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
@Component({
  selector: 'app-employee-add-contact',
  templateUrl: './employee-add-contact.component.html',
  styleUrls: ['./employee-add-contact.component.scss']
})
export class EmployeeAddContactComponent implements OnInit {
  private subscription: Subscription;
@Input() contactsArray :any =[];
  @Input() _currentAction = 'new';
  @Output() onAction = new EventEmitter<any>();
 @Input() empRelationTypeArray :any;
employeeId :any ;
empContactName:any;
empRelation:any;
empPhoneNumber:any;
empEmail:any;
isSaveFormDataCalled:any;
contactData:any=[];
  constructor(private http : HttpClient,private sharedService :SharedServiceService) { }

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
    this.contactData[inputName] = inputValue;
  }
  addContact(){
    const timestamp = new Date().getTime(); 
    const requestBody = {
      id:timestamp,
       fkempid:this.employeeId,
        contactname:this.empContactName,
         relationtype:this.empRelation,
          phonenumber:this.empPhoneNumber,
           email:this.empEmail,
            remarks:null
            
    }
    
    this.http.post(`${API_BASE_URL}/v1/empcontact/add`,requestBody).subscribe((data)=>{
      // this.contactsArray = data;
      this.contactsArray.push(data);
      console.log(this.contactsArray)

      
    })
    
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
          this.addContact();
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

}

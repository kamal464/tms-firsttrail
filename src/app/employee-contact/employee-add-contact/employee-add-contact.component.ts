import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api_Base,API_BASE_URL } from 'src/app/shared/api-config';
@Component({
  selector: 'app-employee-add-contact',
  templateUrl: './employee-add-contact.component.html',
  styleUrls: ['./employee-add-contact.component.scss']
})
export class EmployeeAddContactComponent implements OnInit {
  _currentAction = 'add';
  @Output() onAction = new EventEmitter<any>();
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }

  addContact(){
    const timestamp = new Date().getTime(); 
    const requestBody = {
      id:timestamp,
       fkempid:98898,
        contactname:'kamal',
         relationtype:'mother',
          phonenumber:90348504504,
           email:'ksjdfdskfjsfjl.com',
            remarks:null,
             sid:null,
              rss:null,
               lct:null,
                lmt:null,
                 sct:null,
                  smt:null
    }
    this.http.post(`${API_BASE_URL}/t/empcontact/add`,requestBody).subscribe((data)=>{
      console.log(data)
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
          this.addContact();
          this._currentAction = 'view';
          this.onAction.emit(action);
          break;
        case 'cancel':
          this._currentAction = 'view';
          break;
        default:
      }
    }

}

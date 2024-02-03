import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Api_Base } from '../shared/api-config';
import { data } from '@syncfusion/ej2';
import { ReasonDataService } from '../shared/services/reasondata.service';

@Component({
  selector: 'app-super-form',
  templateUrl: './super-form.component.html',
  styleUrls: ['./super-form.component.scss'],
})
export class SuperFormComponent implements OnInit {
  _currentAction = 'view';
  offices: any;
  departments:any=[
    // {id: 1695276466079, fkofficeid: 1695200343594, fkorgid: 1, hodfkempid: null, name: 'kamal'}
    // ,
    // {id: 1704872101944, fkofficeid: 1695200343594, fkorgid: 1, hodfkempid: null, name: 'sunny'}
  ];
  private isSaveFormDataCalled = false;
  formData: any = [];
  isChecked = true;
  getall: any = [
    {
      title: 'Mr',
      name: 'ABC123',
      empno: 'Country',
      email: '1234567890',
      mobile: '9876543210',
      fkofficeid: 'example@example.com',
      fkdepartmentid: 'www.example.com',
      joiningdate: '9876543210',
      dateofbirth: 'linkedin.com/example',
      mothlyctc: 'Some remarks',
      btechgrade: 'sdfsdfsfs',
      skills: 'dfsdf',
      remarks: 'dfsf',
    },
  ];

  skills:any=[{code:'html',value:'html'},
  {code:'css',value:'css'},
  {code:'js',value:'js'},
  {code:'python',value:'python'},]
  constructor(private http: HttpClient,private reasondata:ReasonDataService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // this.getOffices();
    this.getOffices();
  }

  handleInput(inputName: string, itemdata): void {
    console.log(inputName, itemdata);
  }

  handleofficedrop(inputName: string, itemdata) {
    console.log(inputName, itemdata.id);
  
    this.reasondata.getTableData('department', { fkofficeid: itemdata.id })
      .subscribe({
        next: (response: any) => {
          this.departments = [...response];
          console.log(this.departments,response)
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.error('Error fetching data for department:', error);
        }
      });
  }
  
  
  doAction(action): void {
    this._currentAction = action;

    switch (action) {
      case 'delete':
        break;
      case 'edit':
        this._currentAction = action;
        break;
      case 'save':
        if (!this.isSaveFormDataCalled) {
          this._currentAction = action;

          console.log(action);
          this.isSaveFormDataCalled = true;
        }
        break;

      case 'cancel':
        this._currentAction = 'view';
        break;
      default:
    }
  }
  ischeckedFn(bool) {
    this.isChecked = bool;
    console.log(bool, 'check');
  }

  // getOffices(){
  //   this.http.post(`${Api_Base}/office/getall`,{}).subscribe((data)=>{console.log(data)
  //   this.offices = data;
  //   }
  //   );
  //   console.log(this.offices,"sdfsdf");
  // }

  getOffices() {
    const headers = new HttpHeaders()

      .set('Content-Type', 'application/json')
      .set('fkorgid', '1');
    // this.http.post(`${Api_Base}/utils/dropdown/office`, {}, { headers })
    this.http.post(`${Api_Base}/office/getall`,{})
      .subscribe((data) => {
        this.offices = data;

        console.log(this.offices);
      });
  }
}

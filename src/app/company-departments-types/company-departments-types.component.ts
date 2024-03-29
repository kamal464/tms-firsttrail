import { Component, OnInit } from '@angular/core';
import { Api_Base,API_BASE_URL } from '../shared/api-config';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-company-departments-types',
  templateUrl: './company-departments-types.component.html',
  styleUrls: ['./company-departments-types.component.scss']
})
export class CompanyDepartmentsTypesComponent implements OnInit {
  _currentAction = 'view';
  errorMsg = '';
departmentTypes :any = [];
  isProcessing = false;
  sendBody:any;
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.getDepartmentTypes();
  }
  doAction(action): void {
    this._currentAction = action;
    if (action == 'new') {
      this._currentAction = 'add';
     
    }
  }
  
  handleInput(inputName: string, inputValue: string): void {
    console.log(inputName,inputValue)
    this.sendBody = {
      ...this.sendBody,
      [inputName]:inputValue
    }
  }

  getDepartmentTypes() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('filtername', 'fkreasonid')
      .set('filtervalue', '1689749905408');
  
    this.http.post(`${API_BASE_URL}/v1/reasonitem/getall`, {}, { headers })
      .subscribe((data) => {
        this.departmentTypes = data;
        console.log(data);
  
        // if (typeof data === 'object' && data !== null) {
         
          // this.fields.push(data);
        // } else {
         
        // }
        // if (Array.isArray(data)) {
        //   this.fields = data.map((item: any) => ({ code: item.code, value: item.value ,id:item.id}));
        
        // } else {
        //   this.fields = [];
        // }
        // console.log(this.fields);
      
      });
  }

addDepartmentType(){
  const timestamp = new Date().getTime(); 
    const requestBody = {
      id: timestamp,
      fkreasonid:1689749905408,
      serialno:'3',
      iseditable:'1',
      isactive:'0',
      code: this.sendBody.code,
      value:this.sendBody.name, 
    }; 

    this.http.post(`${API_BASE_URL}/v1/reasonitem/add` , requestBody).subscribe((data)=>{
      this.departmentTypes.push(data);
      console.log('departmentType is added', requestBody)
    })
}

}

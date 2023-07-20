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
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.getDepartmentTypes();
  }
  doAction(action): void {
    if (action == 'new') {
      this._currentAction = 'add';
     
    }
  }
  cancelAdd(): void {
    this._currentAction = 'view';
  
  }

  getDepartmentTypes() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('filtername', 'fkreasonid')
      .set('filtervalue', '1689749905408');
  
    this.http.post(`${API_BASE_URL}/t/reasonitem/getall`, {}, { headers })
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


}

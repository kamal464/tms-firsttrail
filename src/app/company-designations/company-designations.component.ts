import { Component, OnInit } from '@angular/core';
import { API_BASE_URL } from '../shared/api-config';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-company-designations',
  templateUrl: './company-designations.component.html',
  styleUrls: ['./company-designations.component.scss']
})
export class CompanyDesignationsComponent implements OnInit {
  _currentAction = 'view';
  errorMsg = '';
  designations:any = [];
  isProcessing = false;
  serialno = 0;
  isLoading = false;
  
  sendBody:any;
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.getDesignations();
  }
  handleInput(inputName: string, inputValue: string): void {
    console.log(inputName,inputValue)
    this.sendBody = {
      ...this.sendBody,
      [inputName]:inputValue
    }
  }

  doAction(action): void {
    this._currentAction = action;
    if (action == 'new') {
      this._currentAction = 'add';
      
    }
  }



getDesignations(){
  const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('filtername', 'fkreasonid')
      .set('filtervalue', '1689917033236');
  
    this.http.post(`${API_BASE_URL}/v1/reasonitem/getall`, {}, { headers })
      .subscribe((data)=>{
this.designations = data
console.log(this.designations)
      })
}

addDesignationType(){
  const timestamp = new Date().getTime(); 
    const requestBody = {
      id: timestamp,
      fkreasonid:1689917033236,
      serialno:'3',
      iseditable:'1',
      isactive:'0',
      code: this.sendBody.code,
      value:this.sendBody.name, 
    }; 

    this.http.post(`${API_BASE_URL}/v1/reasonitem/add` , requestBody).subscribe((data)=>{
      this.designations.push(data);
      console.log('designations is added', requestBody)
    })
}


}



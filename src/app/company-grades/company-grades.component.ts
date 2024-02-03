import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api_Base,API_BASE_URL } from '../shared/api-config';
@Component({
  selector: 'app-company-grades',
  templateUrl: './company-grades.component.html',
  styleUrls: ['./company-grades.component.scss']
})
export class CompanyGradesComponent implements OnInit {
  _currentAction = 'view';
  errorMsg = '';
  isProcessing = false;
 
  grades:any=[];
  sendBody:any;
  constructor( private http : HttpClient) { }

  ngOnInit(): void {
    this.getGrades();
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

  getGrades(){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('filtername', 'fkreasonid')
    .set('filtervalue', '1689922248200');

  this.http.post(`${API_BASE_URL}/v1/reasonitem/getall`, {}, { headers })
    .subscribe((data)=>{
this.grades = data
console.log(this.grades)
    })
  }



  addGrades(){
    const timestamp = new Date().getTime(); 
      const requestBody = {
        id: timestamp,
        fkreasonid:1689922248200,
        serialno:'3',
        iseditable:'1',
        isactive:'0',
        code: this.sendBody.code,
        value:this.sendBody.name, 
      }; 
  
      this.http.post(`${API_BASE_URL}/v1/reasonitem/add` , requestBody).subscribe((data)=>{
        this.grades.push(data);
        console.log('grades is added', requestBody)
      })
  }
}

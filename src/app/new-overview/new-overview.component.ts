import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-new-overview',
  templateUrl: './new-overview.component.html',
  styleUrls: ['./new-overview.component.scss']
})
export class NewOverviewComponent implements OnInit {
  name: string;
  view: any=[];
  _currentAction = 'view';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getRecord()
  }
  doAction(action: any): void {
    switch (action) {
      case 'edit':
        this._currentAction = action;
        break;
      case 'save':
        break;
      default:
        this._currentAction = 'view';
    }
  }


  getRecord(){
    this.http.post('http://192.168.0.58:5000/org/getorg',{}).subscribe((data =>{ console.log(data)
  this.view = data;
  
  }))
  }


  onSubmit() {
  if(this.isvalidtext(this.view.name)){
    console.log(`${this.view.name} is valid`);

  }else {
    console.log(`${this.view.name} is invalid`);
  }
    // let jsonform = JSON.stringify();
    // this.http
    // .post('http://192.168.0.55:5000/org/addorg', {})
    // .subscribe((response) => {
    //   console.log(response);
    // });
  }

isvalidtext(text){
  const regex = /^[a-zA-Z]*$/;
  return regex.test(text)
}




}

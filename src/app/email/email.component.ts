import { Component,EventEmitter, OnInit ,Input,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  @Output() dataChanged = new EventEmitter<any>();
  @Output() inputValueEmitter = new EventEmitter<string>();
  @Input() companyname: string;
  @Input() placeHolder: string;
  @Input() inputName:string;
  inputData: any = [];
  texterr:boolean=false;
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.getRecord();
  }

  addInputValue(value: string) {
    this.inputValueEmitter.emit(value);
  }
  onInputChange() {
    this.onInput();
    this.dataChanged.emit(this.inputData);
  }

  onInput() {
    const email = this.inputData.email.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    this.texterr = true;
  } else {
    this.texterr = false;
  }
  }
  getRecord(){
    this.http.post('http://192.168.0.58:5000/org/getorg',{}).subscribe((data =>{ console.log(data)
  this.inputData = data;
  
  }))
  }
}

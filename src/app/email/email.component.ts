import { Component,EventEmitter, OnInit ,Input,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  @Output() dataChanged = new EventEmitter<any>();
  @Input() companyname: string;
  @Input() placeHolder: string;
  @Input() inputName:string;
  inputData: any = [];
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.getRecord();
  }


  onInputChange() {
    this.dataChanged.emit(this.inputData);
  }


  getRecord(){
    this.http.post('http://192.168.0.58:5000/org/getorg',{}).subscribe((data =>{ console.log(data)
  this.inputData = data;
  
  }))
  }
}

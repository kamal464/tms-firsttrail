import { Component,EventEmitter, OnInit ,Input,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-phonenumber',
  templateUrl: './phonenumber.component.html',
  styleUrls: ['./phonenumber.component.scss']
})
export class PhonenumberComponent implements OnInit {
  @Output() dataChanged = new EventEmitter<any>();
  @Input() numbertype: string;
  @Input() placeHolder: string;
  inputData: any = [];
  @Input() inputName:any;
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.getRecord();
  }
  getRecord(){
    this.http.post('http://192.168.0.58:5000/org/getorg',{}).subscribe((data =>{ console.log(data)
  this.inputData = data;
  
  }))
  }


  onInputChange() {
    
    this.dataChanged.emit(this.inputData);
  }

}

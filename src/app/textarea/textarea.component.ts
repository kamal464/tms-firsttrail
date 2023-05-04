import { Component,EventEmitter, OnInit ,Input,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {
  @Output() dataChanged = new EventEmitter<string>();
  @Input() title: string;
  @Input() placeHolder: string;
  inputData: any = [];
  @Input() inputName:any;
  constructor(private http: HttpClient) { }

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

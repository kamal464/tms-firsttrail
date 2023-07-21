import { Component,EventEmitter, OnInit ,Input,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {
  @Output() dataChanged = new EventEmitter<string>();
  @Output() inputValueEmitter = new EventEmitter<string>();
  @Input() title: string;
  @Input()  formData: any=[];
  @Input() placeHolder: string;
  inputData: any = [];
  texterr=false;
  @Input() inputName:any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.getRecord();
  }

  addInputValue(value: string) {
    this.inputValueEmitter.emit(value);
    
  }
  onInputChange() {
 
    this.dataChanged.emit(this.inputData);
  }

  onInput() {
    const text = this.formData.comments.trim();
    
    console.log(text)
    if (text.length > 30) {
      this.texterr = true;
    } else {
      this.texterr = false;
    }
  }
  
}

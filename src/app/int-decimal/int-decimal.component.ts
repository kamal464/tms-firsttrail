import { Component,EventEmitter, OnInit ,Input,Output } from '@angular/core';

@Component({
  selector: 'app-int-decimal',
  templateUrl: './int-decimal.component.html',
  styleUrls: ['./int-decimal.component.scss']
})
export class IntDecimalComponent implements OnInit {
  @Output() dataChanged = new EventEmitter<any>();
  @Output() inputValueEmitter = new EventEmitter<string>();
  @Input() inttype:string;
  @Input() placeHolder:string;
  @Input()  formData: any=[];
  @Input() inputName:any;
  @Input() precision:any;
  error: string;
texterr:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  addInputValue(value: string) {
    this.inputValueEmitter.emit(value);
  }

onInput(){
  if (this.inputName === 'fax' && this.precision === '2') {
    if (this.formData.fax.length < 1) {
      this.error = `${this.inttype} must be at least 1 characters long`;
    } else if (!/^\d+(?:\.\d{1,2})?$/.test(this.formData.fax)) {
      this.error = `${this.inttype} must contain only digits with 2 precision`;
    } else {
      this.error = null;
    }
}
  if (this.inputName === 'fax' && this.precision === '3') {
    if (this.formData.fax.length < 1) {
      this.error = `${this.inttype} must be at least 1 characters long`;
    } else if (!/^\d+(?:\.\d{1,3})?$/.test(this.formData.fax)) {
      this.error = `${this.inttype} must contain only digits with 3 precision`;
    } else {
      this.error = null;
    }
}
}
onInputChange() {
  this.onInput();
  this.dataChanged.emit(this.formData);
}
}

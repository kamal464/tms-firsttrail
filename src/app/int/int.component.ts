import { Component,EventEmitter, OnInit ,Input,Output } from '@angular/core';

@Component({
  selector: 'app-int',
  templateUrl: './int.component.html',
  styleUrls: ['./int.component.scss']
})
export class IntComponent implements OnInit {
@Output() dataChanged = new EventEmitter<any>();
@Output() inputValueEmitter = new EventEmitter<string>();
@Input() inttype:string;
@Input() placeHolder:string;
@Input()  formData: any=[];
@Input() inputName:any;
error: string;
texterr:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

  addInputValue(value: string) {
    this.inputValueEmitter.emit(value);
  }

onInput(){
  if (this.inputName === 'phone') {
    if (this.formData.phone.length < 1) {
      this.error = `${this.inttype} must be at least 1 characters long`;
    } else if (/[^0-9]/g.test(this.formData.phone)) {
      this.error = `${this.inttype} must contain only digits`;
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

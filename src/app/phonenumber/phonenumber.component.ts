import { Component,EventEmitter, OnInit ,Input,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-phonenumber',
  templateUrl: './phonenumber.component.html',
  styleUrls: ['./phonenumber.component.scss']
})
export class PhonenumberComponent implements OnInit {
  @Output() dataChanged = new EventEmitter<any>();
  @Output() inputValueEmitter = new EventEmitter<string>();
  @Input() numbertype: string;
  @Input() placeHolder: string;
  @Input()  formData: any=[];
  inputData: any = [];
  @Input() inputName:any;
  error: string;
  texterr:boolean=false;
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
   
  }


  addInputValue(value: string) {
    this.inputValueEmitter.emit(value);
  }


  // onInput() {
  //   const digits = this.inputData.phone.replace(/[^0-9]/g,' ');
  //   if (this.inputData.phone !== digits) {
  //     this.texterr = true;
  //   } else {
  //     this.texterr = false;
  //   }
  // }

onInput(){
  if (this.inputName === 'phone') {
    if (this.formData.phone.length < 10) {
      this.error = `${this.numbertype} must be at least 10 characters long`;
    } else if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(this.formData.phone)) {
      this.error = `${this.numbertype} must contain only digits`;
    } else {
      this.error = null;
    }
  } else if (this.inputName === 'fax') {
    if (this.formData.fax.length < 10) {
      this.error = `${this.numbertype} must be at least 10 characters long`;
    } else if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(this.formData.fax)) {
      this.error = `${this.numbertype} must contain only digits`;
    } else {
      this.error = null;
    }
  } else if (this.inputName === 'whatsapp')  {
    if(this.formData.whatsapp.length < 10) {
      this.error = `${this.numbertype} must be at least 10 characters long`;
    }else if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(this.formData.whatsapp)) {
      this.error = `${this.numbertype} must contain only capital letters`;
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

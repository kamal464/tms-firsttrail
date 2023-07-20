import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'kit-ui-text-edit',
  templateUrl: './kit-ui-text-edit.component.html',
  styleUrls: ['./kit-ui-text-edit.component.scss'],
})
export class KitUiTextEditComponent implements OnInit {
  @Output() dataChanged = new EventEmitter<any>();
  @Output() inputValueEmitter = new EventEmitter<string>();
  @Output() dataEvent = new EventEmitter<string>();
  @Input() formData: any = [];
  @Input() companyname: string;
  @Input() placeHolder: string;

  inputData: any = [];
  @Input() inputName: string;
  texterr: boolean = false;
  error: string;

  sendData() {
    this.dataEvent.emit(this.inputData);
    console.log(this.inputData)
  }
  addInputValue(value: string) {
    this.inputValueEmitter.emit(value);
  }
  // onEnter(value: any) {
  //   this.newItemEvent.emit(value);
  // }

  // onInput() {
  //   const lettersOnly = this.inputData.name.replace(/[^a-zA-Z ]/g, '');
  //   if (this.inputData.name !== lettersOnly) {
  //     this.texterr = true;
  //   } else {
  //     this.texterr = false;
  //   }
  // }

  onInput() {
    if (this.inputName === 'name') {
      if (this.formData.name.length < 3) {
        this.error = `${this.companyname} must be at least 3 characters long`;
      } else if (!/^[a-zA-Z ]+$/.test(this.formData.name)) {
        this.error = `${this.companyname} must contain only letters and spaces`;
      } else {
        this.error = null;
      }
    } else if (this.inputName === 'shortname') {
      if (this.formData.shortname.length < 4) {
        this.error = `${this.companyname} must be at least 4 characters long`;
      } else if (!/^[a-zA-Z]+$/.test(this.formData.shortname)) {
        this.error = `please enter correct ${this.companyname} format`;
      } else {
        this.error = null;
      }
    } else if (this.inputName === 'website') {
      if (this.formData.website.length < 10) {
        this.error = `${this.companyname} must be at least 10 characters long`;
      } else if (
        !/^www\.[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(this.formData.website)
      ) {
        this.error = `please enter correct ${this.companyname} format`;
      } else {
        this.error = null;
      }
    } else if (this.inputName === 'linkedin') {
      if (this.formData.linkedin.length < 10) {
        this.error = `${this.companyname} must be at least 10 characters long`;
      } else if (
        !/^www\.[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(this.formData.linkedin)
      ) {
        this.error = `please enter correct ${this.companyname} format`;
      } else {
        this.error = null;
      }
    }
  }

  onInputChange() {
    this.onInput();
    this.dataChanged.emit(this.formData);
  }

  constructor(private http: HttpClient) {}

 

  ngOnInit(): void {
    // this.getRecord()

    console.log(this.formData[this.inputName])
  }

 
}

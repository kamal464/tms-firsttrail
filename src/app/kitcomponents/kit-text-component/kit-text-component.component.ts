import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';

@Component({
  selector: 'app-kit-text-component',
  templateUrl: './kit-text-component.component.html',
  styleUrls: ['./kit-text-component.component.scss']
})
export class KitTextComponentComponent implements OnInit {
  @Input() label: any;
  @Input() required: boolean = false;
  @Input() placeholder: any;
  @Input() fielddata: any;
  @Input() readonly:boolean = false;
  @Input() customPattern: string;
  @Input() minLength: number; 
  @Input() maxLength: number; 
  @Output() sendData = new EventEmitter<any>();
  error: string; // Add an error variable




  DataToParent(value:any){
    
    this.handleInputChange(value)
    // this.sendData.emit(value)

  }
  constructor() { }

  ngOnInit(): void {
    console.log(this.fielddata,this.placeholder,this.label ,this.minLength,this.maxLength,this.customPattern);  
   
  }


  handleInputChange(value: any) {
    // Check if the field is required and empty
    if (this.required && value.trim() === '') {
      this.error = 'This field is required.';
    }
    // Check custom pattern and other validations
    else {
      // Use the custom regex pattern if provided, or a default pattern
      const regexPattern = this.customPattern || /^[a-zA-Z]*$/;
      if ((regexPattern instanceof RegExp && regexPattern.test(value)) || (typeof regexPattern === 'string' && new RegExp(regexPattern).test(value))) {
        // Check for minimum length
        if (this.minLength && value.length < this.minLength) {
          this.error = `Minimum length is ${this.minLength} characters.`;
        }
        // Check for maximum length
        else if (this.maxLength && value.length > this.maxLength) {
          this.error = `Maximum length is ${this.maxLength} characters.`;
        } else {
          this.error = null; // No errors
          this.sendData.emit(value);
        }
      } else {
        this.error = 'Input does not match the pattern.';
      }
    }
  }
  

  // onKeyDown(event: KeyboardEvent) {
    // if (this.maxLength  && this.fielddata.length >= this.maxLength) {
    //   // && this.fielddata.length >= this.maxLength
    //   // Allow Backspace and Delete keys
    //   if (event.key !== 'Backspace' && event.key !== 'Delete') {
    //     event.preventDefault();
    //   }
    // }
  // }
  
  onKeyDown(event: KeyboardEvent) {
    if (this.maxLength !== undefined && this.fielddata !== null && this.fielddata !== undefined) {
      if (this.fielddata.length >= this.maxLength) {
        if (event.key !== 'Backspace' && event.key !== 'Delete') {
              event.preventDefault();
            }
      }
    }
  }
  
  
  
}
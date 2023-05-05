import { Component,EventEmitter, OnInit ,Input,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'kit-ui-text-edit',
  templateUrl: './kit-ui-text-edit.component.html',
  styleUrls: ['./kit-ui-text-edit.component.scss']
})
export class KitUiTextEditComponent implements OnInit {
  @Output() dataChanged = new EventEmitter<any>();
  @Output() inputValueEmitter = new EventEmitter<string>();
  @Input() companyname: string;
  @Input() placeHolder: string;
  inputData: any = [];
  @Input() inputName:string;
  texterr:boolean=false;
  error: string;

  
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
  

onInput(){
  if (this.inputName === 'name') {
    if (this.inputData.name.length < 3) {
      this.error = `${this.companyname} must be at least 3 characters long`;
    } else if (!/^[a-zA-Z ]+$/.test(this.inputData.name)) {
      this.error = `${this.companyname} must contain only letters and spaces`;
    } else {
      this.error = null;
    }
  } else if (this.inputName === 'shortname') {
    if (this.inputData.shortname.length < 4) {
      this.error = `${this.companyname} must be at least 4 characters long`;
    } else if (!/^[A-Z]+$/.test(this.inputData.shortname)) {
      this.error = `${this.companyname} must contain only capital letters`;
    } else {
      this.error = null;
    }
  }
  else if (this.inputName === 'website'){
    if (this.inputData.website.length < 10) {
      this.error = `${this.companyname} must be at least 2 characters long`;
    } else if (!/^www\.[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(this.inputData.website)) {
      this.error = `${this.companyname} must contain only capital letters`;
    } else {
      this.error = null;
    }
  }
  else if (this.inputName === 'linkedin'){
    if (this.inputData.linkedin.length < 10) {
      this.error = `${this.companyname} must be at least 2 characters long`;
    } else if (!/^www\.[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(this.inputData.linkedin)) {
      this.error = `${this.companyname} must contain only capital letters`;
    } else {
      this.error = null;
    }
  }
  
}


  onInputChange() {


    this.onInput();
    this.dataChanged.emit(this.inputData);
  }
  

constructor(private http : HttpClient,) {}

//   this.sharedService.getValue().subscribe((value) => {
//     this.inputData = value;
//     this.callPostMethod();
//   });
// }

callPostMethod() {
  console.log('i got a call')
  // Call the POST method here using the Angular HTTP service
  this.http.post('http://192.168.0.58:5000/org/addorg', this.inputData).subscribe();

}

  ngOnInit(): void {
    this.getRecord()
  }


  getRecord(){
    this.http.post('http://192.168.0.58:5000/org/getorg',{}).subscribe((data =>{ console.log(data)
  this.inputData = data;
  
  }))
  }




}

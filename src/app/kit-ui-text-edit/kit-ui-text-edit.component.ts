import { Component,EventEmitter, OnInit ,Input,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'kit-ui-text-edit',
  templateUrl: './kit-ui-text-edit.component.html',
  styleUrls: ['./kit-ui-text-edit.component.scss']
})
export class KitUiTextEditComponent implements OnInit {
  // @Output() dataEvent = new EventEmitter<string>();
  @Output() dataChanged = new EventEmitter<string>();
  @Input() companyname: string;
  @Input() placeHolder: string;
  inputData: any = [];
  @Input() inputName:string;
  texterr:boolean=false;
  onInput() {
    const lettersOnly = this.inputData.name.replace(/[^a-zA-Z ]/g, '');
    if (this.inputData.name !== lettersOnly) {
      this.texterr = true;
    } else {
      this.texterr = false;
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

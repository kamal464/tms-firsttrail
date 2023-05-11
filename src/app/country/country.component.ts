import { Component,EventEmitter, OnInit ,Input,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  @Output() dataChanged = new EventEmitter<any>();
  @Output() inputValueEmitter = new EventEmitter<string>();
  @Input() placeHolder: string;
  @Input() inputName:string;
  @Input()  formData: any[]=[];
// inputData:any=[];
  selectedOption:any;
  options : any= [{ label: 'Ind' }, { label: 'us' }, { label: 'uk' }];
  constructor(private http: HttpClient) { }

  addInputValue(value: string) {
    this.inputValueEmitter.emit(this.selectedOption);
  }


  onInputChange() {
    this.validateDropdown();
    this.dataChanged.emit(this.selectedOption);
  }
  validateDropdown() {
    var dropdown = document.getElementById("my-dropdown");
    var selectedValue = dropdown;
    var errorMsg = document.getElementById("error-msg");
    
    if (!selectedValue) {
      errorMsg.style.display = "block";
      return false;
    } else {
      errorMsg.style.display = "none";
      return true;
    }
  }
  getCountries(){
    this.http.post('http://192.168.0.58:5000/org/getcountry',{}).subscribe((data =>{ console.log(data)
  this.options = data;
  
  }))
  }
  ngOnInit(): void {
    this.getCountries();
    // this.getRecord();
  }

  // getRecord(){
  //   this.http.post('http://192.168.0.58:5000/org/getorg',{}).subscribe((data =>{ console.log(data)
  // this.inputData = data;
  
  // }))
  // }



}

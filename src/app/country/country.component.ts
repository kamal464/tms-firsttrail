import { Component,EventEmitter, OnInit ,Input,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  @Input() placeHolder: string;

  selectedOption:any;
  options = [{ label: 'ind' }, { label: 'us' }, { label: 'uk' }];
  constructor(private http: HttpClient) { }



  getRecord(){
    this.http.post('http://192.168.0.58:5000/org/getcountry',{}).subscribe((data =>{ console.log(data)
  this.selectedOption = data;
  
  }))
  }
  ngOnInit(): void {
    this.getRecord();
  }

}

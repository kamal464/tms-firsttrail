import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-kit-datepicker',
  templateUrl: './kit-datepicker.component.html',
  styleUrls: ['./kit-datepicker.component.scss']
})
export class KitDatepickerComponent implements OnInit {
  @Input() label: any;
  @Input() placeholder: any;
  @Input() fielddata: any;
  @Output() sendData = new EventEmitter<any>();
  constructor() { }



  ngOnInit(): void {
    
  }

  
  DataToParent(value:any){
    console.log(value.value,"datepicker")
    this.sendData.emit(value.value)
  }

}

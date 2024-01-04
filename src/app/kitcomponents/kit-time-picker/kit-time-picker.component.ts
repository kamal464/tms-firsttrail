import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-kit-time-picker',
  templateUrl: './kit-time-picker.component.html',
  styleUrls: ['./kit-time-picker.component.scss']
})
export class KitTimePickerComponent implements OnInit {
  @Input() label: any;
  @Input() placeholder: any;
  @Input() fielddata: any;
  @Output() sendData = new EventEmitter<any>();
  constructor() { }



  ngOnInit(): void {

    if(this.fielddata){
      console.log(this.fielddata);
    }
  }

  ngOnChanges():void {
    console.log(this.fielddata,'datepicker component')
  }
  
  DataToParent(value:any){
    console.log(value.value,"datepicker")
    this.sendData.emit(value.value)
  }

}

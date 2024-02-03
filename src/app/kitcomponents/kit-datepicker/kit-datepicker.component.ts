import { Component, OnInit,Input,Output,EventEmitter,OnChanges } from '@angular/core';

import { DatetointPipe } from 'src/app/shared/pipes/datetoint.pipe';


@Component({
  selector: 'app-kit-datepicker',
  templateUrl: './kit-datepicker.component.html',
  styleUrls: ['./kit-datepicker.component.scss']
})
export class KitDatepickerComponent implements OnInit,OnChanges {
  @Input() label: any;
  @Input() placeholder: any;
  @Input() fielddata: any;
  @Output() sendData = new EventEmitter<any>();
  constructor(private dateToIntPipe:DatetointPipe ) { }



  ngOnInit(): void {

    if(this.fielddata){
      console.log(this.fielddata);
    }
  }

  ngOnChanges():void {
    console.log(this.fielddata,'datepicker component')
  }
  
  DataToParent(value: any): void {
    const formattedDate = value.value ? this.dateToIntPipe.transform(value.value) : null;
    console.log(formattedDate, "formatted date");
    this.sendData.emit(formattedDate);
  }
  

}

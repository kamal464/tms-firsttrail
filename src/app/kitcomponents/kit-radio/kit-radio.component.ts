import {Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-kit-radio',
  templateUrl: './kit-radio.component.html',
  styleUrls: ['./kit-radio.component.scss']
})
export class KitRadioComponent implements OnInit {
@Input()firstoption:any;
@Input()secondoption:any;
@Input()thirdoption:any;
  @Input() label: any;
  @Input() placeholder: any;
  @Input() fielddata: any;

  @Output() sendData = new EventEmitter<any>();
    public value: any;
    constructor() { 
    
    
    }
   
  DataToParent(value:any){
   
    
    this.sendData.emit(value)
  }
  
  ngOnInit(): void {
    
  }

}

import { Component, ViewEncapsulation, Inject, ViewChild,Input ,Output,EventEmitter} from '@angular/core';
import { SwitchComponent } from '@syncfusion/ej2-angular-buttons';
import { rippleMouseHandler } from '@syncfusion/ej2-buttons';


@Component({
  selector: 'app-kit-toggle-switch',
  templateUrl: './kit-toggle-switch.component.html',
  styleUrls: ['./kit-toggle-switch.component.scss']
})
export class KitToggleSwitchComponent {
@Input()toggle:any;
@Output() sendData = new EventEmitter<any>();


  constructor() {
      
  }

  booleanFun(){
    let result = this.toggle === 1 ? true : false;
    return result;

  }
  ngOnInit(): void {
console.log(this.toggle);
     
}


DataToParent(event: any) {
  const selectedValue = event.checked;
  console.log(event)
  console.log(selectedValue);
  this.sendData.emit(selectedValue);
}

}
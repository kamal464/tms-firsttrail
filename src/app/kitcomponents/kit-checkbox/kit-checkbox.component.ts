import { Component, OnInit ,ViewChild,Inject,Output,EventEmitter, Input} from '@angular/core';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
@Component({
  selector: 'app-kit-checkbox',
  templateUrl: './kit-checkbox.component.html',
  styleUrls: ['./kit-checkbox.component.scss']
})
export class KitCheckboxComponent implements OnInit {
  @Input() label: any;
  @Input() fieldData:any
  @Output() sendData = new EventEmitter<any>();
 
 
 
  @ViewChild('checkbox')
    public checkbox: CheckBoxComponent;

    constructor(){}
    

    // function to handle the CheckBox change event
    public changeHandler() : void {
       
        console.log(this.checkbox.checked)
        this.sendData.emit(this.checkbox.checked)
    }
   
  ngOnInit(): void {
  }

}

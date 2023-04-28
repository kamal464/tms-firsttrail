import { Component, OnInit ,Input} from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
@Component({
  selector: 'kit-ui-text-edit',
  templateUrl: './kit-ui-text-edit.component.html',
  styleUrls: ['./kit-ui-text-edit.component.scss']
})
export class KitUiTextEditComponent implements OnInit {
  @Input() label: string;
  @Input() placeholder: string;
  // @Input() formControlName: any;
  @Input() someThing: any;
  @Input() myFormControl: FormControl;
  // @Input() myFormControl: any;
  @Input() FormControlNameValue :any;


  get myFormGroup() {
    return this.myFormControl.parent;
  }

constructor() {}
  
  ngOnInit(): void {
  }

}

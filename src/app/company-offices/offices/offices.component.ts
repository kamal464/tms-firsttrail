import { Component, OnInit} from '@angular/core';
import { FormBuilder ,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.scss']
})
export class OfficesComponent implements OnInit {
  myGroup: FormGroup;

  _officeTitle = '';

  currentAction = 'view';
  hasNew = false;
  hasEdit = true;
  constructor( private formBuilder: FormBuilder,) {
    this.myGroup = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      flatno: ['', Validators.required],
      buildingname: ['', Validators.required],
      roadnumber: ['', Validators.required],
      landmark: ['', Validators.required],
      location: ['', Validators.required],
      city: ['', Validators.required],
      fkcountrycode: [null, Validators.required],
      pincode: ['', Validators.required],
    })
   }


saveOff(){
  console.log(this.myGroup.value)
}


  doAction(action: any): void {
    switch (action) {
      case 'edit':
        this.currentAction = action;
        break;
      case 'save':
        break;
      default:
        this.currentAction = 'view';
    }
  }
  ngOnInit(): void {
  }

}

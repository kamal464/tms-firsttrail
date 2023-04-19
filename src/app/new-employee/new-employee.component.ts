import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { textvalidator } from '../shared/form.validators';


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss'],
})
export class NewEmployeeComponent implements OnInit {
  companyDetails: FormGroup;
  currentAction = 'view';
  hasNew = false;
  hasEdit = true;
  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  constructor(private formBuilder:FormBuilder) {
    this.companyDetails = this.formBuilder.group({
      firstname :['',textvalidator()],
      middlename :['',Validators.required],
      lastname :['',Validators.required],
      email :['',Validators.required],
      mobile :['',Validators.required],
      password :['',Validators.required],
      confirmpassword :['',Validators.required],
      birth :['',Validators.required],
      joining :['',Validators.required],
      marriage :['',Validators.required],
      resignation:['',Validators.required],
      skills:['',Validators.required],
      comments:['',Validators.required],
      education:['',Validators.required],
      marks:['',Validators.required],
      rating:['',Validators.required],
    })







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
  ngOnInit(): void {}
}

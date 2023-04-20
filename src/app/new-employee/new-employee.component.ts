import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray, FormBuilder, Validators } from '@angular/forms';
import { patternValidator ,ageValidator,marriageValidator,resignationValidator } from '../shared/form.validators';


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss'],
})
export class NewEmployeeComponent implements OnInit {
  companyDetails: FormGroup;
  selectedOption = '';
  options = [
    {"label":"cse"},
    {"label":"civil"},
    {"label":"mechnical"}
]
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

  constructor(private formBuilder: FormBuilder) {
    this.companyDetails = this.formBuilder.group({
      firstname: [
        '',
        [Validators.required, patternValidator(/^[a-zA-Z]{1,30}$/)],
      ],
      middlename: ['', [Validators.required,  patternValidator(/^[a-zA-Z]{1,30}$/)]],
      lastname: ['', [Validators.required,  patternValidator(/^[a-zA-Z]{1,30}$/)]],
      email: ['',[ Validators.required,patternValidator(/.{1,}@[^.]{1,}/)]],
      mobile: ['', [Validators.required,patternValidator(/^\d{0,10}$/)]],
      password: ['', [Validators.required,patternValidator(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-+]).{8,}$/)]],
      confirmpassword: ['', [Validators.required]],
      birth: ['', Validators.required],
      joining: ['',[ Validators.required ]],
      marriage: ['',[ Validators.required]],
      resignation: ['', Validators.required],
      skills:  [[], Validators.required],
      comments: ['', [Validators.required,patternValidator(/^.{0,300}$/)]],
      education: ['', Validators.required],
      marks: ['',[ Validators.required,patternValidator(/^(?:100(?:\.0{1,2})?|\d{1,2}(?:\.\d{1,2})?)$/)]],
      rating: ['', Validators.required],
    },{ validators:[ marriageValidator(),ageValidator(),resignationValidator()],});


  }

  addCheckboxOption(option: string) {
    const control = this.formBuilder.control(false);
    (this.companyDetails.get('checkboxArray') as FormArray).push(control);
  }
  
  

 onSave() {
  
    {
    console.log(this.companyDetails.value)
    }
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

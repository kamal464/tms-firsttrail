import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  patternValidator,
  ageValidator,
  marriageValidator,
  resignationValidator,
} from '../shared/form.validators';
import { filter } from 'rxjs/operators';
function matchPasswordValidator(
  control: FormControl
): { [key: string]: boolean } | null {
  const password = control.parent?.get('password')?.value;
  const confirmPassword = control.value;
  if (password !== confirmPassword) {
    return { matchPassword: true };
  }
  return null;
}

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss'],
})
export class NewEmployeeComponent implements OnInit {
  maxDate: string = new Date().toISOString().slice(0, 10);
  companyDetails: FormGroup;
  selectedOption = '';
  options = [{ label: 'cse' }, { label: 'civil' }, { label: 'mechnical' }];
  submitted = false;
  info = 'noview';
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
    this.companyDetails = this.formBuilder.group(
      {
        firstname: [
          '',
          [Validators.required, patternValidator(/^[a-zA-Z]{1,30}$/)],
        ],
        middlename: ['', [, patternValidator(/^[a-zA-Z]{1,30}$/)]],
        lastname: [
          '',
          [Validators.required, patternValidator(/^[a-zA-Z]{1,30}$/)],
        ],
        email: ['', [Validators.required, patternValidator(/.{1,}@[^.]{1,}/)]],
        mobile: [
          '',
          [Validators.required, patternValidator(/^(\+\d{1,3}[- ]?)?\d{10}$/)],
        ],
        password: [
          '',
          [
            Validators.required,
            patternValidator(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-+]).{8,}$/
            ),
          ],
        ],
        confirmpassword: ['', [Validators.required, matchPasswordValidator]],
        birth: ['', [Validators.required]],
        joining: ['', [Validators.required]],
        marriage: [''],
        resignation: [''],
        skills: new FormArray([], [Validators.required]),
        comments: ['', [patternValidator(/^.{0,300}$/)]],
        education: [''],
        marks: [
          '',
          [patternValidator(/^(?:100(?:\.0{1,3})?|\d{1,3}(?:\.\d{1,3})?)$/)],
        ],
        rating: ['', Validators.required],
      },
      {
        validators: [
          marriageValidator(),
          ageValidator(),
          resignationValidator(),
        ],
      }
    );

    this.companyDetails
      .get('mobile')
      .valueChanges.pipe(filter((val) => val.length <= 10))
      .subscribe();
  }

  get passwordControl(): FormControl {
    return this.companyDetails.get('password') as FormControl;
  }

  get confirmPasswordControl(): FormControl {
    return this.companyDetails.get('confirmpassword') as FormControl;
  }

  addCheckboxOption(option: string) {
    const control = this.formBuilder.control(false);
    (this.companyDetails.get('checkboxArray') as FormArray).push(control);
  }

  // onSave() {
  //   this.submitted = true;
  //   if (this.companyDetails.valid) {
  //     console.log(this.companyDetails.value);
  //   }
  // }

  onCancel() {
    console.log(this.companyDetails)
    if(this.companyDetails.value != null ){

      this.companyDetails.reset();
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

  inFo(): void {
    this.info = 'view';
  }
  ngOnInit(): void {}

  onKeyDown(event: KeyboardEvent) {
    const inputField = event.target as HTMLInputElement;
    if (
      inputField.value.length >= 10 &&
      event.key !== 'Backspace' &&
      event.key !== 'Delete'
    ) {
      event.preventDefault();
    }
  }


  oncharDown(event: KeyboardEvent) {
    const inputField = event.target as HTMLInputElement;
    if (
      inputField.value.length >= 300 &&
      event.key !== 'Backspace' &&
      event.key !== 'Delete' &&
      event.key !== 'ctrl' &&
      event.key !== 'a'
    ) {
      event.preventDefault();
    }
  }
  onmarksDown(event: KeyboardEvent) {
    const inputField = event.target as HTMLInputElement;
    if (
      inputField.value.length >= 6 &&
      event.key !== 'Backspace' &&
      event.key !== 'Delete'
    ) {
      event.preventDefault();
    }
  }

 
  errorMessages: string[] = [];

  populateErrorMessages() {
    Object.keys(this.companyDetails.controls).forEach(field => {
      const control = this.companyDetails.get(field);
console.log(this.errorMessages)
      if (control instanceof FormControl && control.errors) {
        Object.keys(control.errors).forEach(error => {
          switch (error) {
            case 'required':
              this.errorMessages.push(`${field} is required`);
              break;
            case 'pattern':
              this.errorMessages.push(`Please check the  ${field},pattern `);
              break;

            default:
              this.errorMessages.push(`Error: ${error}`);
              break;
          }
        });
      }
    });
  }



  onSave() {
    this.submitted = true;

    // if (this.companyDetails.valid) {
    //   console.log(this.companyDetails.value);

    //   return;
    // }

    // const invalidControls = [];
    // const controls = this.companyDetails.controls;

    // Object.keys(controls).forEach((key) => {
    //   const control = controls[key];

    //   if (control.invalid) {
    //     invalidControls.push({ name: key, errors: control.errors });
    //   }
    // });

    // console.log(invalidControls, 'invalid');
  }
}

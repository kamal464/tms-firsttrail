import { AbstractControl, ValidatorFn,FormControl } from '@angular/forms';
import * as moment from 'moment';
export function patternValidator(pattern: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // no error if there is no value present
    }
    const valid = pattern.test(control.value);
    return valid ? null : { pattern: { value: control.value } };
  };
}

export function ageValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const birthdate = moment(control.get('birth')?.value);
    const joiningDate = moment(control.get('joining')?.value);

    const age = moment.duration(joiningDate.diff(birthdate)).asYears();

    if (age < 18) {
      return { ageInvalid: true };
    }

    return null;
  };
}
export function marriageValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const birthdate = moment(control.get('birth')?.value);
    const marriageDate = moment(control.get('marriage')?.value);

    const age = moment.duration(marriageDate.diff(birthdate)).asYears();

    if (age < 21) {
      return { marriageInvalid: true };
    }

    return null;
  };
}
export function resignationValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const joiningDate = moment(control.get('joining')?.value);
    const resignationDate = moment(control.get('resignation')?.value);

    // const age = moment.duration(resignationDate.diff(joiningDate)).asYears();

    if (resignationDate < joiningDate) {
      return { resignationInvalid: true };
    }

    return null;
  };
}

export function matchPasswordValidator(control: FormControl): { [key: string]: boolean } | null {
  const password = control.parent?.get('password')?.value;
  const confirmPassword = control.value;
  if (password !== confirmPassword) {
    return { 'matchPassword': true };
  }
  return null;
}


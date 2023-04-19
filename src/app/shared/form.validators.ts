import { AbstractControl, ValidatorFn } from '@angular/forms';

export function textvalidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const regex = /^[A-Za-z]+$/;
    const valid = regex.test(control.value);
    // return valid ? null : { invalidFirstName: true };

    if (!valid) {
        return {
          invalidText: {
            message: 'Please enter only letters'
          }
        };
      }
      return null;
  };
}

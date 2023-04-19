import { AbstractControl, ValidatorFn } from '@angular/forms';

export function patternValidator(pattern: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // no error if there is no value present
    }
    const valid = pattern.test(control.value);
    return valid ? null : { pattern: { value: control.value } };
  };
}

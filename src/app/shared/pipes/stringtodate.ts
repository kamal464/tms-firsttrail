import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToDate',
})
export class StringToDatePipe implements PipeTransform {
  transform(value: any): string {
    if (typeof value !== 'number' || value < 10000000 || value > 99999999) {
      return value.toString(); // Return the original value if it's not a valid number
    }

    const stringValue = value.toString();
    const year = stringValue.slice(0, 4);
    const month = stringValue.slice(4, 6);
    const day = stringValue.slice(6, 8);

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
  }
}

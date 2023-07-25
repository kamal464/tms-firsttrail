import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'stringdate'
})
export class StringdatePipe implements PipeTransform {

  transform(value: number, src_format: string, tar_format: string = 'DD MM YYYY'): string {
    const date = new Date(value);
    return moment(date, src_format).format(tar_format);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'svcDateFormat'
})
export class SvcDateFormatPipe implements PipeTransform {

  transform(dateToConvert: Date): string {
    if (dateToConvert) {
      const dtc = new Date(dateToConvert);
      dtc.setHours(dtc.getHours() + 2);
      const dateString = new Date(dtc).toJSON();
      return dateString.replace('T', '@').substr(0, dateString.length - 8);
    }
    return null;
  }

}

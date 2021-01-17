import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFunctionsService {

  constructor() { }

  addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  getMondayFromWeeksDay(weeksDay: Date) {
    return this.addDays(weeksDay, -this.addDays(weeksDay, -1).getDay());
  }

}

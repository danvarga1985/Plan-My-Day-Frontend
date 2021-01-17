import { Injectable } from '@angular/core';
import { Settings } from '../interfaces/settings';
import { DateFunctionsService } from './date-functions.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public settings: Settings;

  constructor(dateFunctionsService: DateFunctionsService) {
    this.settings = {
      firstDate: dateFunctionsService.getMondayFromWeeksDay(new Date(new Date().setHours(0, 0, 0)))
    };
  }

  getFirstDate() {
    return this.settings.firstDate;
  }

  setFirstDate(date: Date) {
    this.settings.firstDate = date;
  }

  getSelectedEntryId(): number {
    return this.settings.selectedEntryId;
  }

}

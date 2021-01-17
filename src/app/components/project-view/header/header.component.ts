import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SettingsService } from 'src/app/services/settings.service';
import { DateFunctionsService } from 'src/app/services/date-functions.service';

@Component({
  selector: 'app-project-view-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DatePipe]
})
export class HeaderComponent implements OnInit {

  headerArray: Date[];
  firstDate = this.settingsService.getFirstDate();

  constructor(private datepipe: DatePipe, public settingsService: SettingsService, private dateFunctionsService: DateFunctionsService) { }

  ngOnInit() {
    this.headerArray = this.createHeaderArray(this.settingsService.getFirstDate());
  }

  createHeaderArray(startDate: Date): Date[] {
    const ha: Date[] = [];
    for (let i = 0; i < 14; i++) {
      ha[i] = this.dateFunctionsService.addDays(startDate, i);
    }
    return ha;
  }

  formattedDate(date: Date): string {
    return this.datepipe.transform(date, 'dd/MM/yyyy');
  }

  weekdayName(date: Date): string {
    return date.toLocaleString('en-us', { weekday: 'long' });
  }

  nextWeek() {
    this.settingsService.setFirstDate(this.dateFunctionsService.addDays(this.settingsService.getFirstDate(), 7));
    this.headerArray = this.createHeaderArray(this.settingsService.getFirstDate());
  }

  previousWeek() {
    this.settingsService.setFirstDate(this.dateFunctionsService.addDays(this.settingsService.getFirstDate(), -7));
    this.headerArray = this.createHeaderArray(this.settingsService.getFirstDate());
  }

  firstDateChanged() {
    const newDate = this.dateFunctionsService.getMondayFromWeeksDay(this.firstDate);

    if (JSON.stringify(newDate) !== JSON.stringify(this.settingsService.getFirstDate()) ||
      JSON.stringify(newDate) !== JSON.stringify(this.firstDate)) {
      this.settingsService.setFirstDate(newDate);
      this.firstDate = this.settingsService.getFirstDate();
      this.headerArray = this.createHeaderArray(this.settingsService.getFirstDate());
    }
  }

}

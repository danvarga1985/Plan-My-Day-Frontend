import { EventEmitter, Input, OnInit } from '@angular/core';
import { Component, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import _moment, { Moment } from 'moment';
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-pmd-datepicker',
  templateUrl: './pmd-datepicker.component.html',
  styleUrls: ['./pmd-datepicker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class PmdDatepickerComponent implements OnInit {

  @Input()
  startDate: Date;
  selectedDate = new FormControl(moment());
  @Output()
  selectedDateChange: EventEmitter<Date> = new EventEmitter();

  constructor() {
    this.selectedDate.setValue(this.startDate);
  }

  ngOnInit() {
    this.selectedDate.setValue(this.startDate);
  }

  handleDateChange($event: MatDatepickerInputEvent<Moment>) {
    const date = $event.value;
    this.selectedDate.setValue(date.add(-(date.add(-1, 'day').day()) + 1, 'days').set({ hour: 0, minute: 0, second: 0, millisecond: 0 }));
    this.selectedDateChange.emit(new Date(this.selectedDate.value));
  }
}

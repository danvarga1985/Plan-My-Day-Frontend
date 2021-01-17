import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDate, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { delay } from 'rxjs/operators';

interface DateInput {
  date: Date;
}

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})

export class DateTimePickerComponent implements OnInit, AfterViewInit {

  @Input()
  timeEnabled: boolean;
  @Input()
  dateEnabled: boolean;
  @Input()
  addOneDayEnabled: boolean;
  @Input()
  clearEnabled: boolean;
  @Input()
  defaultDate: Date;

  today = this.calendar.getToday();

  selectedDateValue: Date;
  @Output() selectedDateChange = new EventEmitter();
  @Input() get selectedDate() {
    return this.selectedDateValue;
  }
  set selectedDate(val: Date) {
    this.selectedDateValue = val;
    this.selectedDateChange.emit(this.selectedDateValue);


    if (this.selectedDateValue) {
      this.selectedDateValue = new Date(this.selectedDateValue);

      this.model = {
        year: this.selectedDateValue.getFullYear(),
        month: this.selectedDateValue.getMonth() + 1,
        day: this.selectedDateValue.getDate()
      };
      this.time = {
        hour: this.selectedDateValue.getHours(),
        minute: this.selectedDateValue.getMinutes()
      };
    }
  }

  model: NgbDateStruct;
  time: any;
  isDisabled = (date: NgbDate, current: { month: number }) => date.month !== current.month;
  isWeekend = (date: NgbDate) => this.calendar.getWeekday(date) >= 6;

  constructor(private calendar: NgbCalendar, config: NgbTimepickerConfig) {
    config.spinners = false;
  }

  ngOnInit() { }

  ngAfterViewInit() {
    setTimeout(() => {
      delay(0);
      if (!this.selectedDate && this.defaultDate) {
        this.selectedDate = this.defaultDate;
      }
    });
  }

  onDateSelect() {
    if (this.time) {
      this.selectedDate = new Date(this.model.year, this.model.month - 1, this.model.day, this.time.hour, this.time.minute);
    } else {
      this.selectedDate = new Date(this.model.year, this.model.month - 1, this.model.day, 0, 0, 0);
    }
  }

  ontTimeChange() {
    if (this.model) {
      this.selectedDate = new Date(this.model.year, this.model.month - 1, this.model.day, this.time.hour, this.time.minute);
    } else {
      this.selectedDate = new Date(0, 0, 0, this.time.hour, this.time.minute);
    }
  }

  addOneDay() {
    this.selectedDate = new Date(this.model.year, this.model.month - 1, this.model.day + 1, this.time.hour, this.time.minute);
  }

  clear() {
    this.model = null;
    this.time = null;
    this.selectedDate = null;
  }
}

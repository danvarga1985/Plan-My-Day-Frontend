import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { ProcessType } from 'src/app/enums/process-types';
import { DateFunctionsService } from 'src/app/services/date-functions.service';
import { SettingsService } from 'src/app/services/settings.service';
import { EntryEditorComponent } from '../../entry-editor/entry-editor.component';

@Component({
  selector: 'app-calendar-view-header',
  templateUrl: './calendar-view-header.component.html',
  styleUrls: ['./calendar-view-header.component.scss'],
  providers: [DatePipe]
})
export class CalendarViewHeaderComponent implements OnInit {

  @Output()
  refreshEntries: EventEmitter<void> = new EventEmitter();

  headerArray: Date[];
  firstDate = this.settingsService.getFirstDate();

  constructor(private datepipe: DatePipe, public settingsService: SettingsService, private dateFunctionsService: DateFunctionsService,
    // tslint:disable-next-line: align
    private modalService: NgbModal) { }

  ngOnInit() {
    this.headerArray = this.createHeaderArray(this.settingsService.getFirstDate());
  }

  createHeaderArray(startDate: Date): Date[] {
    const ha: Date[] = [];
    for (let i = 0; i < 7; i++) {
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
    this.refreshEntries.emit();
    this.firstDate = this.settingsService.getFirstDate();
  }

  previousWeek() {
    this.settingsService.setFirstDate(this.dateFunctionsService.addDays(this.settingsService.getFirstDate(), -7));
    this.headerArray = this.createHeaderArray(this.settingsService.getFirstDate());
    this.refreshEntries.emit();
    this.firstDate = this.settingsService.getFirstDate();
  }

  firstDateChanged(date: Date) {
    this.settingsService.setFirstDate(date);
    this.createHeaderArray(this.firstDate);
    this.headerArray = this.createHeaderArray(this.settingsService.getFirstDate());
    this.refreshEntries.emit();
  }

  addSingleEntry(startDate?: Date) {
    if (!startDate) {
      startDate = new Date();
    }
    const modalRef = this.modalService.open(EntryEditorComponent, { size: 'lg' });

    modalRef.componentInstance.processType = ProcessType.ADD_NEW;
    modalRef.componentInstance.startDate = startDate;
    modalRef.componentInstance.isSingle = true;
  }

}

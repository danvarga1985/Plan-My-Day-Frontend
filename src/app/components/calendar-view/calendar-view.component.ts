import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarEntry } from 'src/app/interfaces/calendar-entry';
import { EntryDetails } from 'src/app/interfaces/entry-details';
import { ProjectViewData } from 'src/app/interfaces/project-view-data';
import { EntryService } from 'src/app/services/entry.service';
import { SettingsService } from 'src/app/services/settings.service';
import _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Store } from '@ngrx/store';
import { refreshCalendarEntries } from 'src/app/actions/calendar-entries.actions';
import { Observable, Subscription } from 'rxjs';
import { EnabledEntryOperations } from 'src/app/interfaces/enabled-entry-operations';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DateFunctionsService } from '../../services/date-functions.service';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit, OnDestroy {

  calendarEntries$: Observable<CalendarEntry[]>;
  projects: EntryDetails[] = []; // needs to be removed
  entries: CalendarEntry[][] = [];
  enabledOperations: EnabledEntryOperations = { add: false, edit: true, delete: true };
  routeSubscription: Subscription;
  entriesSubscription: Subscription;
  startDate;
  endDate;


  constructor(private http: EntryService, private settings: SettingsService,
    // tslint:disable-next-line: align
    private calendarEntriesStore: Store<{ calendarEntries: CalendarEntry[] }>,
    // tslint:disable-next-line: align
    private router: Router, private route: ActivatedRoute) {
    this.calendarEntries$ = calendarEntriesStore.select('calendarEntries');
  }

  ngOnInit() {
    const sd = this.route.snapshot.queryParamMap.get('startDate')
    const ed = this.route.snapshot.queryParamMap.get('endDate');

    if (sd === null || ed === null) {
      this.router.navigate(['']);
    }

    this.routeSubscription = this.route.queryParamMap.subscribe((queryParams: Params) => {
      this.startDate = queryParams.get('startDate');
      this.endDate = queryParams.get('endDate');

      if (this.startDate && this.endDate) {
        const firstDate = moment(this.startDate, 'YYYYMMDD');
        const lastDate = moment(firstDate).add(6, 'day').set({ hour: 23, minute: 59, second: 59, millisecond: 59 });

        this.setFirstDateWithMondayOfParam();

        this.http.getPeriodsGroupedEntries(firstDate.toDate(), lastDate.toDate()).then((entries: CalendarEntry[]) => {
          this.calendarEntriesStore.dispatch(refreshCalendarEntries({ calendarEntries: entries }));
        });
      } else {
        this.refreshEntries();
      }
    })

    this.entriesSubscription = this.calendarEntries$.subscribe((entries: CalendarEntry[]) => {
      if (entries) {
        this.loadEntries(entries);
      }
    });
  }

  refreshEntries() {
    const firstDate = moment(this.settings.getFirstDate());
    const endDate = moment(firstDate).add(6, 'day').set({ hour: 23, minute: 59, second: 59, millisecond: 59 });

    this.http.getPeriodsGroupedEntries(firstDate.toDate(), endDate.toDate()).then((entries: CalendarEntry[]) => {
      this.calendarEntriesStore.dispatch(refreshCalendarEntries({ calendarEntries: entries }));
    });

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { startDate: firstDate.format('YYYYMMDD'), endDate: endDate.format('YYYYMMDD') },
        queryParamsHandling: 'merge'
      }
    );
  }

  loadEntries(entries: CalendarEntry[]) {
    this.entries = [];
    for (let index = 0; index < 7; index++) {
      this.entries[index] = [];
    }
    entries.forEach((entry: CalendarEntry) => {
      const dayIndex = moment(entry.startDate).add(-1, 'day').day();
      this.entries[dayIndex].push(entry);
    });
  }

  private setFirstDateWithMondayOfParam() {
    const year = this.startDate.substr(0, 4);
    const month = this.startDate.substr(4, 2) - 1;
    const day = this.startDate.substr(6, 2);
    const date = new Date(year, month, day);
    this.settings.setFirstDate(date);
  }

  ngOnDestroy() {
    this.entriesSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}

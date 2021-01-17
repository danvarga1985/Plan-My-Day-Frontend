import { Component, OnInit, Input } from '@angular/core';
import { EntryService } from 'src/app/services/entry.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectViewData } from 'src/app/interfaces/project-view-data';
import { Store } from '@ngrx/store';
import { EntryDetails } from 'src/app/interfaces/entry-details';
import { NestedEntry } from 'src/app/interfaces/nested-entry';
import { refreshProjectsEntries } from 'src/app/actions/projects-entries.actions';
import { refreshProjectList } from 'src/app/actions/project-list.actions';
import moment from 'moment';
import { CalendarEntry } from 'src/app/interfaces/calendar-entry';
import { SettingsService } from 'src/app/services/settings.service';
import { refreshCalendarEntries } from 'src/app/actions/calendar-entries.actions';

@Component({
  selector: 'app-confirm-delete-entry',
  templateUrl: './confirm-delete-entry.component.html',
  styleUrls: ['./confirm-delete-entry.component.scss']
})
export class ConfirmDeleteEntryComponent implements OnInit {

  @Input()
  entryId: number;
  @Input()
  entryTitle: string;
  @Input()
  projectId: number;

  constructor(private http: EntryService, public activeModal: NgbActiveModal,
    // tslint:disable-next-line: align
    private settings: SettingsService,
    // tslint:disable-next-line: align
    private projectListStore: Store<{ projectList: EntryDetails[] }>,
    // tslint:disable-next-line: align
    private projectsEntriesStore: Store<{ projectsEntries: NestedEntry }>,
    // tslint:disable-next-line: align
    private calendarEntriesStore: Store<{ calendarEntries: CalendarEntry[] }>) { }

  ngOnInit() {
  }

  deleteEntry(): void {
    this.http.deleteEntry(this.entryId).then((projectViewData: ProjectViewData) => {
      this.projectsEntriesStore.dispatch(refreshProjectsEntries({
        projectsEntries: projectViewData.projectsEntries
      }));
      this.projectListStore.dispatch(refreshProjectList({
        projectList: projectViewData.projectList
      }));
      this.refreshCalendarEntries();
      this.activeModal.close();
    });
  }

  // needs to remove: calendar enries should come from add/modify/delete repsonse
  refreshCalendarEntries() {
    const startDate = this.settings.getFirstDate();
    const endDate = moment(this.settings.getFirstDate()).add(6, 'day').set({ hour: 23, minute: 59, second: 59, millisecond: 59 });
    this.http.getPeriodsGroupedEntries(startDate, endDate.toDate()).then((ces: CalendarEntry[]) => {
      this.calendarEntriesStore.dispatch(refreshCalendarEntries({ calendarEntries: ces }));
    });
  }

}

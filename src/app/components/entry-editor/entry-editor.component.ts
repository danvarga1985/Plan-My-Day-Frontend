import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EntryService } from 'src/app/services/entry.service';
import { EntryDetails } from 'src/app/interfaces/entry-details';
import { EntryTypes } from 'src/app/enums/entry-types.enum';
import { EntryPhase } from 'src/app/enums/entry-phases';
import { ProcessType } from 'src/app/enums/process-types';
import { EmptyEntryDetailsService } from 'src/app/services/empty-entry-details.service';
import { ProjectViewData } from 'src/app/interfaces/project-view-data';
import { CloseWithOpenChildrenComponent } from '../entry-close/close-with-open-children/close-with-open-children.component';
import { CloseParentWithClosedChildrenComponent } from '../entry-close/close-parent-with-closed-children/close-parent-with-closed-children.component';
import { NestedEntry } from 'src/app/interfaces/nested-entry';
import { Store } from '@ngrx/store';
import { refreshProjectsEntries } from 'src/app/actions/projects-entries.actions';
import { refreshProjectList } from 'src/app/actions/project-list.actions';
import { SettingsService } from 'src/app/services/settings.service';
import moment from 'moment';
import { CalendarEntry } from 'src/app/interfaces/calendar-entry';
import { refreshCalendarEntries } from 'src/app/actions/calendar-entries.actions';

@Component({
  selector: 'app-entry-editor',
  templateUrl: './entry-editor.component.html',
  styleUrls: ['./entry-editor.component.scss'],
})
export class EntryEditorComponent implements OnInit {

  @Input()
  entryId: number;
  @Input()
  processType: ProcessType;
  @Input()
  projectId: number;
  @Input()
  startDate?: Date;
  @Input()
  isSingle: boolean;

  readonly entryTypes = [{
    name: EntryTypes.TASK,
    label: 'Task'
  },
  {
    name: EntryTypes.EVENT,
    label: 'Event'
  },
  {
    name: EntryTypes.MEMO,
    label: 'Memo'
  }];

  readonly entryPhases = [{
    name: EntryPhase.UNSTARTED,
    label: '-'
  },
  {
    name: EntryPhase.WIP,
    label: 'WIP'
  },
  {
    name: EntryPhase.COMPLETED,
    label: '\u2713'
  }];

  readonly defaultStartDate = new Date(new Date().setHours(10, 0, 0));

  entry: EntryDetails = this.emptyEntryDetailsService.emptyEntryDetails();
  titleIsEmpty: boolean;
  titleIsEmptyMessage = 'Title is mandatory!';

  originallyClosed: boolean;

  constructor(public activeModal: NgbActiveModal, private entryDetailsService: EntryService,
    // tslint:disable-next-line: align
    private emptyEntryDetailsService: EmptyEntryDetailsService, private entryService: EntryService,
    // tslint:disable-next-line: align
    private settings: SettingsService,
    // tslint:disable-next-line: align
    private modalService: NgbModal,
    // tslint:disable-next-line: align
    private projectListStore: Store<{ projectList: EntryDetails[] }>,
    // tslint:disable-next-line: align
    private projectsEntriesStore: Store<{ projectsEntries: NestedEntry }>,
    // tslint:disable-next-line: align
    private calendarEntriesStore: Store<{ calendarEntries: CalendarEntry[] }>) {
    this.titleIsEmpty = false;
  }

  ngOnInit() {
    if (this.processType === ProcessType.EDIT) {
      this.entryDetailsService.getEntryDetails(this.entryId).then((entry: EntryDetails) => {
        this.entry = entry;
        this.originallyClosed = this.entry.closed;
      });
    }
    if (this.startDate) {
      this.entry.date = this.startDate;
    }
  }

  save() {
    if (this.entry.title === '') {
      this.titleIsEmpty = true;
    } else {

      if (this.processType === ProcessType.ADD_NEW) {

        this.entry.id = undefined;
        this.entry.parentId = this.entryId;

        if (this.isSingle) {
          this.entryDetailsService.addNewSingleEntry(this.entry).then(() => {
            this.refreshCalendarEntries();
            this.activeModal.close();
          });
        } else {
          this.entryDetailsService.addNewEntry(this.entry).then((pwd: ProjectViewData) => {
            this.storeProjectViewData(pwd);
            this.activeModal.close();
          });
        }
      } else {

        const entryId = this.entry.id;

        const entryForSvc = JSON.parse(JSON.stringify(this.entry));

        entryForSvc.userId = undefined;
        entryForSvc.child = undefined;
        entryForSvc.finished = undefined;
        entryForSvc.id = undefined;

        if (this.entry.isProject) {
          this.modifyEntry(entryId, entryForSvc, true);
        } else {
          this.modifyEntry(entryId, entryForSvc, false);
        }
      }
    }
  }

  selectEntryType(entryType: EntryTypes) {
    this.entry.entryType = entryType;
  }

  selectEntryPhase(entryPhase: EntryPhase) {
    this.entry.entryPhase = entryPhase;
  }

  modifyEntry(entryId: number, entryForSvc: EntryDetails, refreshProjects: boolean): void {
    let checkIfAllChildrenAreClosed = false;
    let checkIfAllSiblingsAreClosed = false;

    if (entryForSvc.closed && !this.originallyClosed) {
      checkIfAllChildrenAreClosed = true;
      checkIfAllSiblingsAreClosed = true;
    }

    this.entryDetailsService.modifyEntry(entryId, entryForSvc, checkIfAllChildrenAreClosed, checkIfAllSiblingsAreClosed)
      .then((pvd: ProjectViewData) => {

        let projectViewData = pvd;
        // Handle case if entry to close has not closed children
        if (pvd.hasNotClosedChildren) {
          const modalRef = this.modalService.open(CloseWithOpenChildrenComponent, { size: 'lg', centered: true });
          modalRef.componentInstance.entryId = entryId;
          modalRef.componentInstance.entry = entryForSvc;
          modalRef.componentInstance.projectId = this.projectId;

          modalRef.result.then((resultChildren) => {
            if (!resultChildren.cancel) {
              projectViewData = resultChildren.projectViewData;
              this.handleIfSiblingsAreClosed(projectViewData).then((resultSiblings) => {
                if (!resultSiblings.cancel) {
                  projectViewData = resultSiblings.projectViewData;
                }
                this.storeProjectViewData(projectViewData);
                this.activeModal.close();
              });
            }
          });
        } else {
          this.handleIfSiblingsAreClosed(projectViewData).then((resultSiblings) => {
            if (!resultSiblings.cancel) {
              projectViewData = resultSiblings.projectViewData;
            }
            this.storeProjectViewData(projectViewData);
            this.activeModal.close();
          });
        }
      });
  }

  handleIfSiblingsAreClosed(projectViewData: ProjectViewData): Promise<any> {
    if (projectViewData.allSiblingsAreClosed) {
      const modalRef = this.modalService.open(CloseParentWithClosedChildrenComponent, { size: 'lg', centered: true });
      const parentEntry = this.findEntryFromId(projectViewData.projectsEntries, this.entry.parentId);
      modalRef.componentInstance.parentEntry = parentEntry;
      return modalRef.result;
    } else {
      return Promise.resolve({
        projectViewData: null,
        cancel: true
      });
    }
  }

  findEntryFromId(entriesInHierarchy: NestedEntry, entryId: number): NestedEntry {
    if (entriesInHierarchy.id === entryId) {
      return entriesInHierarchy;
    }

    for (const entry of entriesInHierarchy.childEntries) {
      if (entry.id === entryId) {
        return entry;
      } else {
        if (entry.childEntries) {
          const e = this.findEntryFromId(entry, entryId);
          if (e) {
            return entriesInHierarchy;
          }
        }
      }
    }

    return null;
  }

  storeProjectViewData(projectViewData: ProjectViewData) {
    this.projectsEntriesStore.dispatch(refreshProjectsEntries({
      projectsEntries: projectViewData.projectsEntries
    }));
    this.projectListStore.dispatch(refreshProjectList({
      projectList: projectViewData.projectList
    }));
    this.refreshCalendarEntries();
  }

  // needs to update later: calendar enries should come from add/modify/delete repsonse
  refreshCalendarEntries() {
    const startDate = this.settings.getFirstDate();
    const endDate = moment(this.settings.getFirstDate()).add(6, 'day').set({ hour: 23, minute: 59, second: 59, millisecond: 59 });
    this.entryService.getPeriodsGroupedEntries(startDate, endDate.toDate()).then((ces: CalendarEntry[]) => {
      this.calendarEntriesStore.dispatch(refreshCalendarEntries({ calendarEntries: ces }));
    });
  }

}

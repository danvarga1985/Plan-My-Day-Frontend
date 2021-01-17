import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EntryService } from 'src/app/services/entry.service';
import { EmptyEntryDetailsService } from 'src/app/services/empty-entry-details.service';
import { EntryDetails } from 'src/app/interfaces/entry-details';
import { ProjectViewData } from 'src/app/interfaces/project-view-data';
import { Store } from '@ngrx/store';
import { NestedEntry } from 'src/app/interfaces/nested-entry';
import { CalendarEntry } from 'src/app/interfaces/calendar-entry';
import { refreshProjectsEntries } from 'src/app/actions/projects-entries.actions';
import { refreshProjectList } from 'src/app/actions/project-list.actions';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss']
})
export class ProjectEditorComponent implements OnInit {

  entry: EntryDetails = this.emptyEntryDetailsService.emptyEntryDetails();
  titleIsEmpty: boolean;
  titleIsEmptyMessage = 'Title is mandatory!';

  constructor(public activeModal: NgbActiveModal, private entryDetailsService: EntryService,
    // tslint:disable-next-line: align
    private emptyEntryDetailsService: EmptyEntryDetailsService, private http: EntryService,
    // tslint:disable-next-line: align
    private projectsEntriesStore: Store<{ projectsEntries: NestedEntry }>,
    // tslint:disable-next-line: align
    private projectListStore: Store<{ projectList: EntryDetails[] }>) {
    this.titleIsEmpty = false;
  }

  ngOnInit() { }

  save() {
    if (this.entry.title === '') {
      this.titleIsEmpty = true;
    } else {
      this.entry.id = undefined;
      this.entry.parentId = undefined;

      this.entryDetailsService.addNewProject(this.entry).then((projectViewData: ProjectViewData) => {
        this.projectsEntriesStore.dispatch(refreshProjectsEntries({
          projectsEntries: projectViewData.projectsEntries
        }));
        this.projectListStore.dispatch(refreshProjectList({
          projectList: projectViewData.projectList
        }));
        this.activeModal.close();
      });
    }
  }

}

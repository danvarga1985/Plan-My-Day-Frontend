import { Component, OnInit } from '@angular/core';
import { EntryForHierarchy } from '../../interfaces/entry-for-hierarchy';
import { NestedEntry } from '../../interfaces/nested-entry';
import { EntryService } from 'src/app/services/entry.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { EntryDetails } from 'src/app/interfaces/entry-details';
import { ExpandEntry } from 'src/app/interfaces/expand-entry';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { refreshProjectsEntries } from 'src/app/actions/projects-entries.actions';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  projectsEntries$: Observable<NestedEntry>;
  projectList$: Observable<EntryDetails[]>;
  entries: EntryForHierarchy[];
  visibleEntries: EntryForHierarchy[];
  projectId: number;
  projects: EntryDetails[];
  test: string;

  constructor(private entryService: EntryService,
    // tslint:disable-next-line: align
    private route: ActivatedRoute, private router: Router,
    // tslint:disable-next-line: align
    projectListStore: Store<{ projectList: EntryDetails[] }>,
    // tslint:disable-next-line: align
    private projectsEntriesStore: Store<{ projectsEntries: NestedEntry }>) {
    this.projectsEntries$ = projectsEntriesStore.select('projectsEntries');
    this.projectList$ = projectListStore.select('projectList');
  }

  ngOnInit() {
    const id: number = +this.route.snapshot.paramMap.get('id');
    if (isNaN(id)) {
      this.router.navigate(['']);
    }

    this.entryService.getProjects(true).then((ed: EntryDetails[]) => {
      this.projects = ed;
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.projectId = +params.get('id');

      if (this.projectId) {
        this.entryService.getProjectsEntries(+params.get('id')).then((n: NestedEntry) => {

          if (n) {
            this.projectsEntriesStore.dispatch(refreshProjectsEntries({ projectsEntries: n }));

            this.projectsEntries$.subscribe((data) => {
              this.entries = this.convertToPlainHierarchy([data]);
              this.setVisibleEntries();
            });
          }
        });
      }
    });
  }

  convertToPlainHierarchy(nestedEntries: NestedEntry[]): EntryForHierarchy[] {
    const efhs: EntryForHierarchy[] = [];

    if (nestedEntries.length > 0 && nestedEntries[0] !== null) {
      nestedEntries.forEach((e: NestedEntry) => {
        this.addEntry(e, efhs, 0);
      });
    }

    return efhs;
  }

  addEntry(nestedEntry: NestedEntry, entriesForHierarchy: EntryForHierarchy[], level: number) {
    const efh: EntryForHierarchy = {
      id: nestedEntry.id,
      title: nestedEntry.title,
      entryType: nestedEntry.entryType,
      entryPhase: nestedEntry.entryPhase,
      hasChildren: nestedEntry.hasOwnProperty('childEntries') ? nestedEntry.childEntries.length !== 0 : false,  // todo
      level,
      date: new Date(nestedEntry.date),
      expanded: nestedEntry.hasOwnProperty('expanded') ? nestedEntry.expanded : true,
      closed: nestedEntry.closed
    };

    entriesForHierarchy.push(efh);

    if (nestedEntry.hasOwnProperty('childEntries') && nestedEntry.childEntries.length > 0) {
      nestedEntry.childEntries.forEach((e: NestedEntry) => {
        this.addEntry(e, entriesForHierarchy, level + 1);
      });
    }
  }

  refreshProjectViewData(refresh: boolean) {
    if (refresh) {
      this.projectsEntries$.subscribe((n: NestedEntry) => {
        this.entries = this.convertToPlainHierarchy([n]);
        this.setVisibleEntries();
      });
    }
  }

  setVisibleEntries() {
    this.visibleEntries = [];
    let invisibleFromLevel = -1;

    this.entries.forEach((entry: EntryForHierarchy) => {

      if (invisibleFromLevel === -1 || entry.level <= invisibleFromLevel) {
        this.visibleEntries.push(entry);
      }

      if (entry.level <= invisibleFromLevel || invisibleFromLevel === -1) {
        if (entry.expanded) {
          invisibleFromLevel = -1;
        } else {
          invisibleFromLevel = entry.level;
        }
      }
    });
  }

  expandParent($event: ExpandEntry) {
    $event.entry.expanded = $event.setExpanded;
    this.setVisibleEntries();
  }

}

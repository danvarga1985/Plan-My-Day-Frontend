import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserHttpService } from 'src/app/services/user-http.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectEditorComponent } from '../project-editor/project-editor.component';
import { EntryDetails } from 'src/app/interfaces/entry-details';
import { EntryService } from 'src/app/services/entry.service';
import { ProjectViewData } from 'src/app/interfaces/project-view-data';
import { UserPreferencesHttpService } from 'src/app/services/user-preferences-http.service';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { refreshProjectList } from 'src/app/actions/project-list.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUserLoggedIn$: Observable<boolean>;
  currentUserDetails$: Observable<User>;
  @Output()
  refresh?: EventEmitter<ProjectViewData> = new EventEmitter();
  environmentName = environment.environmentName;
  onlyActive: boolean;
  projectList$: Observable<EntryDetails[]>;

  // tslint:disable-next-line: max-line-length
  constructor(private userHttp: UserHttpService, private entryHttp: EntryService, private router: Router, private modalService: NgbModal,
    // tslint:disable-next-line: align
    private userPreferencesHttpService: UserPreferencesHttpService, private entryService: EntryService,
    // tslint:disable-next-line: align
    private projectListStore: Store<{ projectList: EntryDetails[] }>) {
    this.projectList$ = projectListStore.select('projectList');
  }

  ngOnInit() {
    this.currentUserLoggedIn$ = this.userHttp.isUserLoggedIn();

    if (this.currentUserLoggedIn$) {
      this.currentUserDetails$ = this.userHttp.getCurrentUser();
      this.currentUserDetails$.subscribe((user: User) => {
        if (this.onlyActive !== user.onlyActiveProjects) {
          this.onlyActive = user.onlyActiveProjects;
          this.setOnlyActive();
        }
      });
      this.loadProjectList();
    }
  }

  logoutUser(): void {
    this.userHttp.logoutUser().then(() => {
      this.router.navigate(['/login-registration']);
    }).catch(() => { });
  }

  addNewProject() {
    const modalRef = this.modalService.open(ProjectEditorComponent, { size: 'lg' });
    modalRef.result.then((projectEntries) => {
      this.refresh.emit(projectEntries);
    });
  }

  setOnlyActive() {
    this.userPreferencesHttpService.setOnlyActiveProjects(this.onlyActive).then(() => {
      this.entryHttp.getProjects(this.onlyActive).then((ed: EntryDetails[]) => {
        this.projectListStore.dispatch(refreshProjectList({
          projectList: ed
        }));
      });
    });
  }

  loadProjectList() {
    this.entryService.getProjects(true).then((ed: EntryDetails[]) => {
      this.projectListStore.dispatch(refreshProjectList({
        projectList: ed
      }));
    });
  }

}

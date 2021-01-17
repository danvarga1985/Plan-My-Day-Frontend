import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectViewComponent } from './components/project-view/project-view.component';
import { EntryHierarchyComponent } from './components/project-view/entry-hierarchy/entry-hierarchy.component';
import { EntryComponent } from './components/project-view/entry-hierarchy/entry/entry.component';
import { LoginRegistrationComponent } from './components/login-registration/login-registration.component';
import { LoginComponent } from './components/login-registration/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegConfirmationComponent } from './components/login-registration/reg-confirmation/reg-confirmation.component';
import { RegistrationComponent } from './components/login-registration/registration/registration.component';
import { EntryToolsComponent } from './components/entry-tools/entry-tools.component';
import { EntryEditorComponent } from './components/entry-editor/entry-editor.component';
import { DateTimePickerComponent } from './components/custom/date-time-picker/date-time-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule, MatInputModule, MatIconModule, MatMenuModule } from '@angular/material';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ConfirmDeleteEntryComponent } from './components/confirm-delete-entry/confirm-delete-entry.component';
import { SvcDateFormatPipe } from './pipes/svc-date-format.pipe';
import { ProjectEditorComponent } from './components/project-editor/project-editor.component';
import { HeaderComponent } from './components/project-view/header/header.component';
import { TaskBarsComponent } from './components/project-view/task-bars/task-bars.component';
import { BarComponent } from './components/project-view/task-bars/bar/bar.component';
import { CloseWithOpenChildrenComponent } from './components/entry-close/close-with-open-children/close-with-open-children.component';
import { CloseParentWithClosedChildrenComponent } from './components/entry-close/close-parent-with-closed-children/close-parent-with-closed-children.component';
import { CalendarViewComponent } from './components/calendar-view/calendar-view.component';
import { CalendarViewHeaderComponent } from './components/calendar-view/calendar-view-header/calendar-view-header.component';
import { MatButtonModule } from '@angular/material/button';
import { PmdDatepickerComponent } from './components/custom/pmd-datepicker/pmd-datepicker.component';
import { projectListReducer } from './reducers/project-list.reducer';
import { StoreModule } from '@ngrx/store';
import { projectsEntriesReducer } from './reducers/projects-entries.reducer';
import { CommonModule } from '@angular/common';
import { calendarEntriesReducer } from './reducers/calendar-entries.reducer';

@NgModule({
  entryComponents: [
    EntryEditorComponent,
    ProjectEditorComponent,
    ConfirmDeleteEntryComponent,
    CloseWithOpenChildrenComponent,
    CloseParentWithClosedChildrenComponent
  ],
  declarations: [
    AppComponent,
    ProjectViewComponent,
    EntryHierarchyComponent,
    EntryComponent,
    LoginRegistrationComponent,
    LoginComponent,
    RegConfirmationComponent,
    RegistrationComponent,
    EntryToolsComponent,
    EntryEditorComponent,
    DateTimePickerComponent,
    NavbarComponent,
    ConfirmDeleteEntryComponent,
    SvcDateFormatPipe,
    ProjectEditorComponent,
    HeaderComponent,
    TaskBarsComponent,
    BarComponent,
    CloseWithOpenChildrenComponent,
    CloseParentWithClosedChildrenComponent,
    CalendarViewComponent,
    CalendarViewHeaderComponent,
    PmdDatepickerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    StoreModule.forRoot({
      projectList: projectListReducer,
      projectsEntries: projectsEntriesReducer,
      calendarEntries: calendarEntriesReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

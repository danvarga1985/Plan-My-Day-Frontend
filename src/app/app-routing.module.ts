import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectViewComponent } from './components/project-view/project-view.component';
import { LoginRegistrationComponent } from './components/login-registration/login-registration.component';
import { RegConfirmationComponent } from './components/login-registration/reg-confirmation/reg-confirmation.component';
import { EntryToolsComponent } from './components/entry-tools/entry-tools.component';
import { EntryEditorComponent } from './components/entry-editor/entry-editor.component';
import { CalendarViewComponent } from './components/calendar-view/calendar-view.component';


const routes: Routes = [
  { path: '', redirectTo: '/calendar-view', pathMatch: 'full'},
  // { path: '', component: EntryEditorComponent },
  { path: 'project-view/:id', component: ProjectViewComponent },
  { path: 'calendar-view', component: CalendarViewComponent },
  { path: 'login-registration', component: LoginRegistrationComponent },
  // { path: '', component: EntryToolsComponent },
  { path: 'reg-conf-page', component: RegConfirmationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

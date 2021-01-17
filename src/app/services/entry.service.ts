import { Injectable } from '@angular/core';
import { EntryDetails } from '../interfaces/entry-details.js';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SERVER_URL } from '../server-url.js';
import { NestedEntry } from '../interfaces/nested-entry.js';
import { SvcDateFormatPipe } from '../pipes/svc-date-format.pipe.js';
import { FormattedEntryDetails } from '../interfaces/formatted-entry-details.js';
import { ProjectViewData } from '../interfaces/project-view-data';
import { CalendarEntry } from '../interfaces/calendar-entry.js';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private http: HttpClient) { }

  private transformEntryDTO(serverData: EntryDetails): EntryDetails {
    serverData.date = serverData.date ? new Date(serverData.date) : null;
    serverData.duration = serverData.duration ? new Date(serverData.duration) : null;
    serverData.deadline = serverData.deadline ? new Date(serverData.deadline) : null;
    return serverData;
  }

  addNewProject(entry: EntryDetails): Promise<ProjectViewData> {
    return this.http.post(SERVER_URL + '/project', this.formatEntryForSvc(entry), { withCredentials: true })
      .toPromise().then();
  }

  getProjects(openOnly: boolean): Promise<EntryDetails[]> {
    return this.http.get(SERVER_URL + '/projects', { withCredentials: true }).toPromise().then();
  }

  getProjectsEntries(id: number): Promise<NestedEntry> {
    return this.http.get(SERVER_URL + '/project?id=' + id, { withCredentials: true }).toPromise().then();
  }

  getProjectviewData(id: number): Promise<ProjectViewData> {
    return this.http.get(SERVER_URL + '/projectview?id=' + id, { withCredentials: true }).toPromise().then();
  }

  getPeriodsGroupedEntries(startDate: Date, endDate: Date): Promise<CalendarEntry[]> {
    const pipe = new SvcDateFormatPipe();
    const params = new HttpParams()
      .append('startDate', pipe.transform(startDate))
      .append('endDate', pipe.transform(endDate));

    return this.http.get(SERVER_URL + '/periodsGroupedEntries', { withCredentials: true, params }).toPromise().then();
  }

  getEntryDetails(entryId: number): Promise<EntryDetails> {
    return this.http.get(SERVER_URL + '/entry?id=' + entryId, { withCredentials: true }).toPromise().then(this.transformEntryDTO);
  }

  addNewEntry(entry: EntryDetails): Promise<ProjectViewData> {
    return this.http.post(SERVER_URL + '/entry', this.formatEntryForSvc(entry), { withCredentials: true })
      .toPromise().then();
  }

  addNewSingleEntry(entry: EntryDetails): Promise<ProjectViewData> {
    return this.http.post(SERVER_URL + '/single', this.formatEntryForSvc(entry), { withCredentials: true })
      .toPromise().then();
  }

  modifyEntry(entryId: number, entry: EntryDetails, checkIfAllChildrenAreClosed: boolean, checkIfAllSiblingsAreClosed: boolean):
    Promise<ProjectViewData> {
    const params = new HttpParams()
      .append('id', entryId.toString())
      .append('checkIfAllChildrenAreClosed', checkIfAllChildrenAreClosed.toString())
      .append('checkIfAllSiblingsAreClosed', checkIfAllSiblingsAreClosed.toString());

    return this.http.put(SERVER_URL + '/entry?id=' + entryId, this.formatEntryForSvc(entry),
      { params, withCredentials: true }).toPromise().then();
  }

  deleteEntry(entryId: number): Promise<ProjectViewData> {
    return this.http.delete(SERVER_URL + '/entry?id=' + entryId, { withCredentials: true }).toPromise().then();
  }

  formatEntryForSvc(entry: EntryDetails): FormattedEntryDetails {
    const formattedEntry: FormattedEntryDetails = JSON.parse(JSON.stringify(entry)) as FormattedEntryDetails;
    const pipe = new SvcDateFormatPipe();

    formattedEntry.date = pipe.transform(entry.date);
    formattedEntry.duration = pipe.transform(entry.duration);
    formattedEntry.deadline = pipe.transform(entry.deadline);

    return formattedEntry;
  }

  expand(entryId: number, setExpanded: boolean): Promise<any> {
    return this.http.post(SERVER_URL + '/expand?id=' + entryId + '&expanded=' + setExpanded, null,
      { withCredentials: true }).toPromise().then();
  }

}

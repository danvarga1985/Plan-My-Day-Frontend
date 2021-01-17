import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../server-url';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesHttpService {

  constructor(private http: HttpClient) { }

  setOnlyActiveProjects(onlyActive: boolean): Promise<void> {
    this.http.post(SERVER_URL + '/userSettings/onlyActiveProjects?status=' + onlyActive, null,
      { withCredentials: true }).toPromise();
    return Promise.resolve();
  }

}

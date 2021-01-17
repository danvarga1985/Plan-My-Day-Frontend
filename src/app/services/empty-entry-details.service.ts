import { Injectable } from '@angular/core';
import { EntryDetails } from '../interfaces/entry-details';
import { EntryTypes } from '../enums/entry-types.enum';

@Injectable({
  providedIn: 'root'
})
export class EmptyEntryDetailsService {

  constructor() { }

  emptyEntryDetails(): EntryDetails {
    return {
      id: -1,
      parentId: -1,
      title: '',
      description: '',
      entryType: EntryTypes.TASK,
      entryPhase: null,
      date: null,
      duration: null,
      deadline: null,
      closed: false
    };
  }
}

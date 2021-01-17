import { createAction, props } from '@ngrx/store';
import { EntryDetails } from '../interfaces/entry-details';

export const refreshProjectList = createAction('[ProjectList Component] Refresh', props<{
    projectList: EntryDetails[]
}>());

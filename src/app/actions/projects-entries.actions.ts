import { createAction, props } from '@ngrx/store';
import { NestedEntry } from '../interfaces/nested-entry';


export const refreshProjectsEntries = createAction('[ProjectsEntries Component] Refresh', props<{ projectsEntries: NestedEntry }>());

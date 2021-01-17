import { createReducer, on } from '@ngrx/store';
import { refreshProjectsEntries } from '../actions/projects-entries.actions';
import { NestedEntry } from '../interfaces/nested-entry';

export const initialState: NestedEntry = null;

// tslint:disable-next-line: variable-name
const _projectsEntriesReducer = createReducer(
    initialState,
    on(refreshProjectsEntries, (state, { projectsEntries }) => (projectsEntries))
);

export function projectsEntriesReducer(state: NestedEntry | undefined, action) {
    return _projectsEntriesReducer(state, action);
}

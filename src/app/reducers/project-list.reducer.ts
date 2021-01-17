import { createReducer, on } from '@ngrx/store';
import { refreshProjectList } from '../actions/project-list.actions';
import { EntryDetails } from '../interfaces/entry-details';

export interface State {
    projectList: EntryDetails[];
}

export const initialState: EntryDetails[] = null;

// tslint:disable-next-line: variable-name
const _projectListReducer = createReducer(
    initialState,
    on(refreshProjectList, (state, { projectList }) => (projectList))
);

export function projectListReducer(state: EntryDetails[] | undefined, action) {
    return _projectListReducer(state, action);
}

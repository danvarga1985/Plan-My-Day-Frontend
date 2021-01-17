import { createReducer, on } from '@ngrx/store';
import { refreshCalendarEntries } from '../actions/calendar-entries.actions';
import { CalendarEntry } from '../interfaces/calendar-entry';

export interface State {
    calendarEntries: CalendarEntry[];
}

export const initialState: CalendarEntry[] = null;

// tslint:disable-next-line: variable-name
const _calendarEntriesReducer = createReducer(
    initialState,
    on(refreshCalendarEntries, (state, { calendarEntries }) => (calendarEntries))
);

export function calendarEntriesReducer(state: CalendarEntry[] | undefined, action) {
    return _calendarEntriesReducer(state, action);
}

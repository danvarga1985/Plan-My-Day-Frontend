import { createAction, props } from '@ngrx/store';
import { CalendarEntry } from '../interfaces/calendar-entry';

export const refreshCalendarEntries = createAction('[CalendarEntries Component] Refresh', props<{
    calendarEntries: CalendarEntry[]
}>());

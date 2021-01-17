import { EntryPhase } from '../enums/entry-phases';
import { EntryTypes } from '../enums/entry-types.enum';

export interface CalendarEntry {
    id: number;
    title: string;
    parentTitle: string;
    startDate: Date;
    duration: Date;
    deadline: Date;
    entryType: EntryTypes;
    entryPhase: EntryPhase;
    closed: boolean;
}

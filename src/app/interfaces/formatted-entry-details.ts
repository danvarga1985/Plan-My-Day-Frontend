import { EntryTypes } from '../enums/entry-types.enum';

export interface FormattedEntryDetails {
    id?: number;
    userId?: string;
    parentId?: number;
    title: string;
    description?: string;
    date?: string;
    duration?: string;
    deadline?: string;
    entryType: EntryTypes;
    entryPhase?: string;
    finished?: boolean;
    child?: boolean;
    closed: boolean;
}

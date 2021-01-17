import { EntryTypes } from '../enums/entry-types.enum';

export interface EntryDetails {
    id?: number;
    userId?: string;
    parentId?: number;
    title?: string;
    description?: string;
    date?: Date;
    duration?: Date;
    deadline?: Date;
    entryType?: EntryTypes;
    entryPhase?: string;
    finished?: boolean;
    child?: boolean;
    isProject?: boolean;
    closed?: boolean;
    expanded?: boolean;
}

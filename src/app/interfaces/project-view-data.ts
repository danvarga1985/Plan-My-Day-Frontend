import { EntryDetails } from './entry-details';
import { NestedEntry } from './nested-entry';

export interface ProjectViewData {
    projectList?: EntryDetails[];
    projectsEntries: NestedEntry;
    hasNotClosedChildren?: boolean;
    allSiblingsAreClosed?: boolean;
}

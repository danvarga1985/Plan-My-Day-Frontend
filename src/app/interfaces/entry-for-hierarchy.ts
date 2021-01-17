export interface EntryForHierarchy {
    id: number;
    userId?: string;
    title: string;
    date?: Date;
    deadline?: string; // TODO
    entryType: string; // TODO
    entryPhase?: string;  // TODO
    hasChildren: boolean;
    hasUncompletedChildren?: boolean;
    level: number;
    expanded: boolean;
    closed: boolean;
}

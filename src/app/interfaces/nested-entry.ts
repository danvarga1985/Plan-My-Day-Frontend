export interface NestedEntry {
    id: number;
    userId: number;
    title: string;
    description?: string;
    date?: string;
    duration?: string;
    deadline?: string;
    entryType: string;
    entryPhase?: string;
    childEntries?: NestedEntry[];
    child?: boolean;
    finished?: boolean;
    // Temporarily
    expanded?: boolean;
    closed: boolean;
}

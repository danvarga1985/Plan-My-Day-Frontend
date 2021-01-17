import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { EntryForHierarchy } from 'src/app/interfaces/entry-for-hierarchy';
import { NestedEntry } from 'src/app/interfaces/nested-entry';
import { ExpandEntry } from 'src/app/interfaces/expand-entry';

@Component({
  selector: 'app-entry-hierarchy',
  templateUrl: './entry-hierarchy.component.html',
  styleUrls: ['./entry-hierarchy.component.scss']
})
export class EntryHierarchyComponent implements OnInit {

  @Input()
  entries: EntryForHierarchy[];
  @Input()
  projectId: number;
  @Output()
  expand: EventEmitter<ExpandEntry> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  expandParent($event: ExpandEntry) {
    this.expand.emit($event);
  }

}

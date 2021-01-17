import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { EntryForHierarchy } from 'src/app/interfaces/entry-for-hierarchy';

@Component({
  selector: 'app-project-view-task-bars',
  templateUrl: './task-bars.component.html',
  styleUrls: ['./task-bars.component.scss']
})
export class TaskBarsComponent implements OnInit {

  @Input()
  entries: EntryForHierarchy[];

  constructor() { }

  ngOnInit() {
  }

}

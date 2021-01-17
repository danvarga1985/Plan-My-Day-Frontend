import { Component, OnInit, Input } from '@angular/core';
import { EntryForHierarchy } from 'src/app/interfaces/entry-for-hierarchy';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-project-view-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  @Input()
  entry: EntryForHierarchy;

  constructor(private settings: SettingsService) { }

  ngOnInit() {
  }

  barStyles(): any {
    const firstDate = new Date(this.settings.getFirstDate().getFullYear(), this.settings.getFirstDate().getMonth(),
      this.settings.getFirstDate().getDate(), 0, 0, 0);
    const dayDiff = Math.floor((this.entry.date.getTime() - firstDate.getTime()) / (24 * 60 * 60 * 1000));

    if (this.entry.date && dayDiff >= 0 && dayDiff <= 13) {
      return {
        'margin-left': 'calc(' + dayDiff + ' * var(--bar-width))'
      };
    } else {
      return {
        visibility: 'hidden'
      };
    }

  }

}

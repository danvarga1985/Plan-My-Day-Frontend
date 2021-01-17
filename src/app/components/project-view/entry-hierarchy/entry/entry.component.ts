import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { EntryForHierarchy } from 'src/app/interfaces/entry-for-hierarchy';
import { ExpandEntry } from 'src/app/interfaces/expand-entry';
import { EntryService } from 'src/app/services/entry.service';
import { EnabledEntryOperations } from 'src/app/interfaces/enabled-entry-operations';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent {

  @Input()
  entry: EntryForHierarchy;
  @Input()
  projectId: number;
  @Output()
  expand: EventEmitter<ExpandEntry> = new EventEmitter();

  selectedEntryId: number;
  enabledOperations: EnabledEntryOperations = { add: true, edit: true, delete: true };

  constructor(private settingsService: SettingsService, private entryService: EntryService) {
    this.selectedEntryId = this.settingsService.getSelectedEntryId();
  }

  entryStyles(): any {
    return {
      'margin-left': this.entry.level * 30 + 'px'
    };
  }

  expandParent(setExpanded: boolean) {
    this.entryService.expand(this.entry.id, setExpanded).then(() => {
      const ee: ExpandEntry = {
        entry: this.entry,
        setExpanded
      };
      this.expand.emit(ee);
    });
  }

}

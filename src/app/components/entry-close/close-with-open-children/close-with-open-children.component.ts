import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntryDetails } from 'src/app/interfaces/entry-details';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EntryService } from 'src/app/services/entry.service';
import { ProjectViewData } from 'src/app/interfaces/project-view-data';

@Component({
  selector: 'app-close-with-open-children',
  templateUrl: './close-with-open-children.component.html',
  styleUrls: ['./close-with-open-children.component.scss']
})
export class CloseWithOpenChildrenComponent implements OnInit {

  @Input()
  entryId: number;
  @Input()
  entry: EntryDetails;
  @Input()
  projectId: number;

  constructor(private http: EntryService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeEntry() {
    this.http.modifyEntry(this.entryId, this.entry, false, true).then((projectViewData: ProjectViewData) => {
      this.activeModal.close({
        projectViewData,
        cancel: false
      });
    });
  }

  cancelClose() {
    this.activeModal.close({
      projectViewData: null,
      cancel: true
    });
  }

}

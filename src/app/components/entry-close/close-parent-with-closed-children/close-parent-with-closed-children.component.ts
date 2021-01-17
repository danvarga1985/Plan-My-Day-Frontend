import { Component, OnInit } from '@angular/core';
import { EntryForHierarchy } from 'src/app/interfaces/entry-for-hierarchy';
import { EntryService } from 'src/app/services/entry.service';
import { ProjectViewData } from 'src/app/interfaces/project-view-data';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EntryDetails } from 'src/app/interfaces/entry-details';

@Component({
  selector: 'app-close-parent-with-closed-children',
  templateUrl: './close-parent-with-closed-children.component.html',
  styleUrls: ['./close-parent-with-closed-children.component.scss']
})
export class CloseParentWithClosedChildrenComponent implements OnInit {

  parentEntry: EntryForHierarchy;

  constructor(private http: EntryService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeParent() {
    const convertedParentEntry: EntryDetails = {
      closed: true,
      expanded: false
    };

    this.http.modifyEntry(this.parentEntry.id, convertedParentEntry, false, true).then((projectViewData: ProjectViewData) => {
      this.activeModal.close({
        projectViewData,
        cancel: false
      });
    });
  }

  cancelParentClose() {
    this.activeModal.close({
      projectViewData: null,
      cancel: true
    });
  }

}

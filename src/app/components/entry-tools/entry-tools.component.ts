import { Component, Input } from '@angular/core';
import { EntryTool } from 'src/app/interfaces/entry-tool';
import { EntryEditorComponent } from '../entry-editor/entry-editor.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProcessType } from 'src/app/enums/process-types';
import { ConfirmDeleteEntryComponent } from '../confirm-delete-entry/confirm-delete-entry.component';
import { EnabledEntryOperations } from 'src/app/interfaces/enabled-entry-operations';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-tools',
  templateUrl: './entry-tools.component.html',
  styleUrls: ['./entry-tools.component.scss']
})
export class EntryToolsComponent implements OnInit {
  @Input()
  entryId?: number;
  @Input()
  entryTitle?: string;
  @Input()
  projectId?: number;
  @Input()
  enabledOperations: EnabledEntryOperations;

  readonly imgFolder = '../../../assets/img/entry-tools';
  tools: EntryTool[] = [];

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if (this.enabledOperations.add) {
      this.addToolItem('Add subtask', 'add-subtask.png', () => {
        this.addNewEntry();
      });
    }
    if (this.enabledOperations.edit) {
      this.addToolItem('Edit', 'edit.png', () => {
        this.editEntry();
      });
    }
    if (this.enabledOperations.delete) {
      this.addToolItem('Delete', 'delete.png', () => {
        this.deleteEntry();
      });
    }
  }

  addToolItem(label: string, imgPath: string, action: () => void) {
    let ti: EntryTool;
    ti = {
      label,
      imgPath: this.imgFolder + '/' + imgPath,
      action
    };
    this.tools.push(ti);
  }

  addNewEntry(): void {
    const modalRef = this.modalService.open(EntryEditorComponent, { size: 'lg' });

    modalRef.componentInstance.processType = ProcessType.ADD_NEW;
    modalRef.componentInstance.entryId = this.entryId;
    modalRef.componentInstance.projectId = this.projectId;
    modalRef.componentInstance.isSingle = false;
  }

  editEntry(): void {
    const modalRef = this.modalService.open(EntryEditorComponent, { size: 'lg' });

    modalRef.componentInstance.processType = ProcessType.EDIT;
    modalRef.componentInstance.entryId = this.entryId;
    modalRef.componentInstance.projectId = this.projectId;
  }

  deleteEntry(): void {
    const modalRef = this.modalService.open(ConfirmDeleteEntryComponent, { size: 'lg' });
    modalRef.componentInstance.entryId = this.entryId;
    modalRef.componentInstance.projectId = this.projectId;
    modalRef.componentInstance.entryTitle = this.entryTitle;
  }

}

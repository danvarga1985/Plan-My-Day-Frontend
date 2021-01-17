import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteEntryComponent } from './confirm-delete-entry.component';

describe('ConfirmDeleteEntryComponent', () => {
  let component: ConfirmDeleteEntryComponent;
  let fixture: ComponentFixture<ConfirmDeleteEntryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDeleteEntryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

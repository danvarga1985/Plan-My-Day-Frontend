import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryHierarchyComponent } from './entry-hierarchy.component';

describe('EntryHierarchyComponent', () => {
  let component: EntryHierarchyComponent;
  let fixture: ComponentFixture<EntryHierarchyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EntryHierarchyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

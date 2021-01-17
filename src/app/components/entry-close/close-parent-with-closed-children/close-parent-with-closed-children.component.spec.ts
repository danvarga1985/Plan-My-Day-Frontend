import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseParentWithClosedChildrenComponent } from './close-parent-with-closed-children.component';

describe('CloseWithClosedChildrenComponent', () => {
  let component: CloseParentWithClosedChildrenComponent;
  let fixture: ComponentFixture<CloseParentWithClosedChildrenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CloseParentWithClosedChildrenComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseParentWithClosedChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

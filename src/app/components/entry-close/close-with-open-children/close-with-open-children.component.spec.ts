import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseWithOpenChildrenComponent } from './close-with-open-children.component';

describe('CloseWithOpenChildrenComponent', () => {
  let component: CloseWithOpenChildrenComponent;
  let fixture: ComponentFixture<CloseWithOpenChildrenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CloseWithOpenChildrenComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseWithOpenChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

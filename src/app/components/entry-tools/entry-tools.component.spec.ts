import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryToolsComponent } from './entry-tools.component';

describe('EntryToolsComponent', () => {
  let component: EntryToolsComponent;
  let fixture: ComponentFixture<EntryToolsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EntryToolsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

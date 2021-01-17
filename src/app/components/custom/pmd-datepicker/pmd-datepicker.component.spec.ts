import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmdDatepickerComponent } from './pmd-datepicker.component';

describe('PmdDatepickerComponent', () => {
  let component: PmdDatepickerComponent;
  let fixture: ComponentFixture<PmdDatepickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PmdDatepickerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmdDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

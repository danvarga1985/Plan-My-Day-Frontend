import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBarsComponent } from './task-bars.component';

describe('TaskBarsComponent', () => {
  let component: TaskBarsComponent;
  let fixture: ComponentFixture<TaskBarsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TaskBarsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

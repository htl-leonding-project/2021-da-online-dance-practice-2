import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseWrapperComponent } from './course-wrapper.component';

describe('CourseWrapperComponent', () => {
  let component: CourseWrapperComponent;
  let fixture: ComponentFixture<CourseWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

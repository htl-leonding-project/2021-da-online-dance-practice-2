import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanceCourseComponent } from './dance-course.component';

describe('DanceCourseComponent', () => {
  let component: DanceCourseComponent;
  let fixture: ComponentFixture<DanceCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanceCourseComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanceCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

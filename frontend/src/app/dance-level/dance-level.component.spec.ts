import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanceLevelComponent } from './dance-level.component';

describe('DanceLevelComponent', () => {
  let component: DanceLevelComponent;
  let fixture: ComponentFixture<DanceLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanceLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanceLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchAddOrEditComponent } from './match-add-or-edit.component';

describe('MatchAddOrEditComponent', () => {
  let component: MatchAddOrEditComponent;
  let fixture: ComponentFixture<MatchAddOrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchAddOrEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchAddOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

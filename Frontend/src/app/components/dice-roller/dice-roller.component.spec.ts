import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceRollerComponent } from './dice-roller.component';

describe('DiceRollerComponent', () => {
  let component: DiceRollerComponent;
  let fixture: ComponentFixture<DiceRollerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiceRollerComponent]
    });
    fixture = TestBed.createComponent(DiceRollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

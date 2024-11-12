import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterPillComponent } from './character-pill.component';

describe('CharacterPillComponent', () => {
  let component: CharacterPillComponent;
  let fixture: ComponentFixture<CharacterPillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterPillComponent]
    });
    fixture = TestBed.createComponent(CharacterPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

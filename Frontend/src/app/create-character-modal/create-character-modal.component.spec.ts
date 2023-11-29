import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCharacterModalComponent } from './create-character-modal.component';

describe('CreateCharacterModalComponent', () => {
  let component: CreateCharacterModalComponent;
  let fixture: ComponentFixture<CreateCharacterModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCharacterModalComponent]
    });
    fixture = TestBed.createComponent(CreateCharacterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

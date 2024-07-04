import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateImportCharComponent } from './create-import-char.component';

describe('CreateImportCharComponent', () => {
  let component: CreateImportCharComponent;
  let fixture: ComponentFixture<CreateImportCharComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateImportCharComponent]
    });
    fixture = TestBed.createComponent(CreateImportCharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

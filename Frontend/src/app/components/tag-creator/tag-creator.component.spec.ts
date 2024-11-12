import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCreatorComponent } from './tag-creator.component';

describe('TagCreatorComponent', () => {
  let component: TagCreatorComponent;
  let fixture: ComponentFixture<TagCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagCreatorComponent]
    });
    fixture = TestBed.createComponent(TagCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

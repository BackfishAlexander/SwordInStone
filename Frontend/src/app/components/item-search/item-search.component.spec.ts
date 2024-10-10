import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSearchComponent } from './item-search.component';

describe('ItemSearchComponent', () => {
  let component: ItemSearchComponent;
  let fixture: ComponentFixture<ItemSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemSearchComponent]
    });
    fixture = TestBed.createComponent(ItemSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

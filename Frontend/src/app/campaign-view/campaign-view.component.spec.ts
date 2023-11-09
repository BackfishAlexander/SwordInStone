import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignViewComponent } from './campaign-view.component';

describe('CampaignViewComponent', () => {
  let component: CampaignViewComponent;
  let fixture: ComponentFixture<CampaignViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignViewComponent]
    });
    fixture = TestBed.createComponent(CampaignViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignBoxComponent } from './campaign-box.component';

describe('CampaignBoxComponent', () => {
  let component: CampaignBoxComponent;
  let fixture: ComponentFixture<CampaignBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignBoxComponent]
    });
    fixture = TestBed.createComponent(CampaignBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

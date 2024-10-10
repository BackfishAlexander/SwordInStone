import { TestBed } from '@angular/core/testing';

import { TooltipServiceService } from './tooltip-service.service';

describe('TooltipServiceService', () => {
  let service: TooltipServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TooltipServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

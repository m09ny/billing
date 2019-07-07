import { TestBed } from '@angular/core/testing';

import { WorkmanshipPriceService } from './workmanship-price.service';

describe('WorkmanshipPriceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkmanshipPriceService = TestBed.get(WorkmanshipPriceService);
    expect(service).toBeTruthy();
  });
});
